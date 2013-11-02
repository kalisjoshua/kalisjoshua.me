/*jshint laxcomma:true*/

var cp = require('child_process')
  , fs = require('fs')
  , http = require('http')
  , url = require('url')

  // npm packages
  , marked = require('marked')
  , swig = require('swig')

  // local resources
  , packge = require('./package.json')
  , router = require('./modules/router.js')

  // global variables
  , cache = {}
  , contentType
  , deploy
  , includeDrafts;

// mapping from file extension to HTTP Content-Type
contentType = {
  css   : {'Content-Type': 'text/css'},
  html  : {'Content-Type': 'text/html'},
  js    : {'Content-Type': 'text/javascript'}
};

// command to pull changes from GitHub's master branch
deploy = 'git pull --rebase %s master'
  .replace(/%s/, packge.repository.url);

// command line argument to include drafts during development
includeDrafts = process.argv
  .toString()
  .indexOf('--drafts') > 0;

/**
 * Sugar function to rebuild in-memory representation of:
 *    1. Templates
 *    2. Articles
 *    3. Public files
 */
function buildCache () {
  // clear templates cached in memory
  swig.invalidateCache();

  cache.articles = cacheArticles();

  // FIXME: refactor into async instead of sync file IO
  cache.passive = fs
    .readdirSync('assets')
    .map(function (path) {
      return '/' + path;
    });
}

/**
 * Read into memory all the articles written.
 * FIXME: refactor into async instead of sync file IO
 *
 * @return {Object}
 *         Collection of all articles as a hashmap and index.
 */
function cacheArticles () {
  var _articles;

  // create the article object
  function articleObject (acc, file) {
    var path
      , text
      , title;

    if (/\.md$/.test(file)) {
      path = '/articles/' + file.match(/.*(?=\.md$)/);

      text = fs.readFileSync('articles/' + file)
        .toString();

      title = meta('Title', text);

      // do not list out articles in "DRAFT" stage
      if (!/\[DRAFT\]/.test(title) || includeDrafts) {
        acc
          .push({
            body      : format(text),
            intro     : intro(text),
            link      : path,
            published : meta('Date', text),
            tags      : meta('Tags', text),
            title     : title
          });
      }
    }

    return acc;
  }

  // descending date order; most recent articles first
  function articleSort (a, b) {
    var _a, _b;

    _a = new Date(a.published);
    _b = new Date(b.published);

    // if a > b return -1
    // if a < b return  1
    // if a = b return  0
    return _a > _b ? -1 : _a < _b ? 1 : 0;
  }

  // return contents to proper markdown; exclude the meta
  // data and create the first title line in the markdown
  function format (text) {
    var title = '# ' + meta('Title', text);

    // remove the meta data
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
          // look for paragraph tokens
          /paragraph/i.test(token.type) &&
          // exclude the meta info lines
          !/^\w+:/i.test(token.text) &&
          // use the text of the first paragraph as the intro on the index page
          token.text;
      }, false);
  }

  // gather meta data from markdown file
  function meta (field, text) {
    var regex = new RegExp(field + '\\s*?:\\s*?([^\\n]+)');

    return text
      // capture the first instance of the pattern
      .match(regex)
      // return only the value of the meta data
      .pop();
  }

  return fs.readdirSync('articles')
    // first create a sort-able array of article objects; leaving off the
    // map address-able links to articles to not be run through in the sort
    .reduce(articleObject, [])
    // sort the articles
    .sort(articleSort)
    // create the map address-able links and store the array back
    // in for listing articles ordered by date on the index page(s)
    .reduce(function (acc, article) {
      // create the key/value pairs
      // pathname/[article object]
      acc[article.link] = article;

      // push the article object into the index to keep the order
      acc.index
        .push(acc[article.link]);

      return acc;
    }, {index: []});
}

/**
 * Get the file extension of the given filepath.
 *
 * @param  {String} path
 *         The filepath.
 *
 * @return {String}
 *         The file extension.
 */
function fileExt (path) {
  return path
    .match(/\w+$/i) // capture the final characters of the string
    .pop();
}

/**
 * Sugar function to make page rendering easier and centralized.
 *
 * @param  {Object} res
 *         The response object for the current request.
 *
 * @param  {Number} code
 *         The HTTP response code to send in the response header.
 *
 * @param  {String} tmpl
 *         A String the corresponds to the filename of the template.
 *
 * @param  {Object} data
 *         An Object to render the page information from.
 *
 * @return {undefined}
 */
function renderPage (res, code, tmpl, data) {
  res.writeHead(code, contentType.html);
  res.end(renderTemplate(tmpl, data));
}

/**
 * Sugar function to make calling templating library easier and centralized.
 *
 * @param  {String} tmpl
 *         A String the corresponds to the filename of the template.
 *
 * @param  {Object} data
 *         An Object to render the page information from.
 *
 * @return {String}
 *         Templating output.
 */
function renderTemplate (tmpl, data) {
  return swig
    .compileFile('./swig/' + tmpl + '.html')(data || {});
}

/**
 * Fairly self explainatory, start the server by:
 *    1. Creating the server and registering the response handler
 *    2. Listen on the PORT provided or a default for development
 *
 * @return {undefined}
 */
function startServer () {
  http
    .createServer(function requestHandler (req, res) {
      var _url = url.parse(req.url);

      // update the cache(s); not sure this is at all necessary with the
      // deploy process on Heroku since it restarts the app each time.
      // helpful during development
      if (/^update$/i.test(_url.query)) {
        buildCache();
      }

      // // post push Git hook URL
      // // when pushing to GitHub's master branch the hook should hit this
      // // URL and the server should be able to self update; not working currently
      // if (/^deploy$/i.test(_url.query)) {
      //   cp.exec(deploy, function (err, result) {
      //     if (err) throw err;
      //     else buildCache();
      //   });
      // }

      // check for assets files first since more requests
      // will come in for those than any other route.
      if (!!~cache.passive.indexOf(_url.pathname)) {
        res.writeHead(200, contentType[fileExt(_url.pathname)]);
        fs.createReadStream('assets' + _url.pathname)
          .pipe(res);
      } else {
        // use the route handler defined in the router or
        // the error route handler as the default if not found
        (router(_url.pathname) || router('error'))(req, res);
      }
    })
    .listen(process.env.PORT || packge.devPort);
}

/**
 * Route for:
 *   1. /
 *   2. /articles
 */
router(/^\/(?:articles)?$/, function (req, res) {
  renderPage(res, 200, 'index', {
    site: packge,
    // use the array of article objects to iterate over for the articles listing
    articles: cache.articles.index
  });
});

/**
 * Route pattern for all articles:
 *   1. /articles/{filename}
 */
router(/^\/articles\/(.*)$/, function (req, res) {
  renderPage(res, 200, 'article', {
    site: packge,
  // find the article object in the cache based on the pathname key;
  // the pathname key is built in the articleCache function
    article: cache
      .articles[url.parse(req.url).pathname]
  });
});

/**
 * Basic error route
 * TODO: make this page more helpful/entertaining than it is
 */
router('error', function (req, res) {
  renderPage(res, 404, 'error', {
    site: packge
  });
});

swig.setFilter('marked', function (input) {
  return marked(input);
});

buildCache();
startServer();
