/*jshint laxcomma:true*/

var cp = require('child_process')
  , fs = require('fs')
  , http = require('http')
  , url = require('url')

  // npm packages
  , marked = require('marked')
  , swig = require('swig')

  // local resources
  , info = require('./package.json')
  , router = require('./modules/router.js')

  // global variables
  , cache = {}
  , contentType
  , deploy = 'git pull --rebase %s master'
    .replace(/%s/, info.repository.url);

contentType = {
  css   : contentType('text/css'),
  html  : contentType('text/html'),
  js    : contentType('text/javascript')
};

function buildCache () {
  // clear templates cached in memory
  swig.invalidateCache();

  cache.articles = cacheArticles();

  cache.passive = cachePublic();
}

function cacheArticles () {
  var _articles;

  function articleObject (acc, file) {
    var path
      , text;

    if (/\.md$/.test(file)) {
      path = '/articles/' + file.match(/.*(?=\.md$)/);

      text = fs.readFileSync('articles/' + file)
        .toString();

      acc
        .push({
          fullMd    : format(text),
          intro     : intro(text),
          link      : path,
          published : meta('Date', text),
          tags      : meta('Tags', text),
          title     : meta('Title', text)
        });
    }

    return acc;
  }

  // descending order; most recent articles first
  function articleSort (a, b) {
    var _a, _b;

    _a = new Date(a.published);
    _b = new Date(b.published);

    return _a > _b ? -1 : _a < _b ? 1 : 0;
  }

  // return contents to proper markdown
  function format (text) {
    var title = '# ' + meta('Title', text);

    text = text
      .replace(/[^\n]\w+:[^\n]+\n/g, '');

    return title + text;
  }

  // get the first paragraph from the markdown
  function intro (text) {
    return marked
      .lexer(text)
      .reduce(function (found, token) {
        return found ||
          /paragraph/i.test(token.type) &&
          !/^\w+:/i.test(token.text) &&
          token.text;
      }, false);
  }

  // gather meta data from markdown file
  function meta (field, text) {
    var regex = new RegExp(field + '\\s*?:\\s*?([^\\n]+)');

    return text
      .match(regex)
      .pop();
  }

  return fs.readdirSync('articles')
    .reduce(articleObject, [])
    .sort(articleSort)
    .reduce(function (acc, article) {
      acc[article.link] = article;

      acc.index
        .push(acc[article.link]);

      return acc;
    }, {index: []});
}

function cachePublic () {
  return fs.readdirSync('public');
}

function contentType (type) {
  return {
      'Content-Type': type
    };
}

function fileExt (path) {
  return path
    .match(/\w+$/i)
    .pop();
}

function renderPage (tmpl, data) {
  tmpl = swig.compileFile('./swig/' + tmpl + '.html');

  return tmpl(data || {});
}

function startServer () {
  http
    .createServer(function requestHandler (req, res) {
      var _url = url.parse(req.url);

      if (/^update$/i.test(_url.query)) {
        buildCache();
      }

      // if (/^deploy$/i.test(_url.query)) {
      //   cp.exec(deploy, function (err, result) {
      //     if (err) throw err;
      //     else buildCache();
      //   });
      // }

      if (!!~cache.passive.indexOf(_url.pathname.slice(1))) {
        res.writeHead(200, contentType[fileExt(_url.pathname)]);
        fs.createReadStream('public' + _url.pathname)
          .pipe(res);
      } else {
        (router(_url.pathname) || router('error'))(req, res);
      }
    })
    .listen(process.env.PORT || 4000);
}

router(/^\/(?:articles)?$/, function (req, res) {
  res.writeHead(200, contentType.html);
  res.end(renderPage('index', {
    site: info,
    articles: cache.articles.index
  }));
});

router(/^\/articles\/(.*)$/, function (req, res) {
  var _article
    , _url = url.parse(req.url);

  _article = cache.articles[_url.pathname];

  res.writeHead(200, contentType.html);
  res.end(renderPage('article', {
    site: info,
    article: {
      body: marked(_article.fullMd),
      published: _article.published,
      tags: _article.tags,
      title: _article.title
    }
  }));
});

router('error', function (req, res) {
  res.writeHead(404, contentType.html);
  res.end(renderPage('error', {
    site: info
  }));
});

buildCache();
startServer();
