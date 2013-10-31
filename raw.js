/*jshint laxcomma:true*/

var fs = require('fs')
  , http = require('http')

  // npm packages
  , marked = require('marked')
  , swig = require('swig')

  // local resources
  , info = require('./package.json')
  , router = require('./modules/router.js')

  // global variables
  , cache = {}
  , contentType;

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
    .reduce(function (acc, file) {
      var path
        , text;

      if (/\.md$/.test(file)) {
        path = '/articles/' + file.match(/.*(?=\.md$)/);

        text = fs.readFileSync('articles/' + file)
          .toString();

        acc[path] = {
          fullMd    : format(text),
          intro     : intro(text),
          link      : path,
          published : meta('Date', text),
          tags      : meta('Tags', text),
          title     : meta('Title', text)
        };

        acc.index
          .push(acc[path]);
      }

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
      req.url = req.url
        .replace(/^\/+/, '/');

      if (!!~cache.passive.indexOf(req.url.slice(1))) {
        res.writeHead(200, contentType[fileExt(req.url)]);
        fs.createReadStream('public' + req.url)
          .pipe(res);
      } else {
        (router(req.url) || router('error'))(req, res);
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
  var _article = cache.articles[req.url];

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

router(/^\/update$/, function (req, res) {
  buildCache();
  res.writeHead(200, contentType.html);
  res.end('ok');
});

router('error', function (req, res) {
  res.writeHead(404, contentType.html);
  res.end(renderPage('error', {
    site: info
  }));
});

buildCache();
startServer();
