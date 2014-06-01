var fs = require('fs'),

    articleObject = require('./article'),

    rPageFilter,

    API;

function articlesReduce(acc, file) {
  if (/\.md$/.test(file)) {
    acc
      .push(articleObject(file));
  }

  return acc;
}

/**
 * Sugar function to rebuild in-memory representation of:
 *    1. Templates
 *    2. Articles
 *    3. Public files
 */
function buildCache() {
  API.articles = cacheArticles();

  // FIXME: refactor into async instead of sync file IO
  API.passive = fs
    .readdirSync('public')
    .map(function (path) {

      return '/' + path;
    });

  // FIXME: refactor into async instead of sync file IO
  API.pages = fs
    .readdirSync('pages')
    .map(function (path) {
      rPageFilter += '|' + path.match(/(.*)\.md/).pop();

      return '/' + path;
    });

  rPageFilter = new RegExp('^\\/(?:' + rPageFilter.slice(1) + ')$');
}

/**
 * Read into memory all the articles written.
 *
 * @return {Object}
 *         Collection of all articles as a hashmap and index.
 */
function cacheArticles() {
  // FIXME: refactor into async instead of sync file IO
  return fs.readdirSync('articles')
    // first create a sort-able array of article objects; leaving off the
    // map address-able links to articles to not be run through in the sort
    .reduce(articlesReduce, [])
    .sort(sortByDate)
    // create the map-addressable links and store the array back
    // in for listing articles ordered by date on the index page
    .reduce(cacheArticlesReduce, {index: []});
}

function cacheArticlesReduce(acc, article) {
  // create the key/value pairs
  // pathname/[article object]
  acc[article.link] = article;

  // push the article object into the index to keep the order
  acc.index
    .push(acc[article.link]);

  return acc;
}

// descending date order; most recent articles first
function sortByDate(a, b) {
  a = a.published ? new Date(a.published) : today;
  b = b.published ? new Date(b.published) : today;

  // if a > b return -1
  // if a < b return  1
  // if a = b return  0
  return a > b ? -1 : a < b ? 1 : 0;
}

API = {
  build: buildCache,
  pageFilter: function () {

    return rPageFilter;
  }
};

module.exports = API;
