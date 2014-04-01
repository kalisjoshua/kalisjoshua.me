var lib = require('modmod')('fs', 'url'),

    cache = require('./cache'),
    pageData = require('./pageData'),
    renderPage = require('./renderPage'),
    router = require('./router');

router(/^\/(?:articles)?$/, function (req, res) {
  renderPage(res, 200, 'index', pageData({
    articles: cache.articles.index,
    showDrafts: /\?drafts/i.test(req.url)
  }));
});

router(/^\/articles\/(.*)$/, function (req, res) {
  // find the article object in the cache based on the pathname key
  renderPage(res, 200, 'article', pageData({
    article: cache.articles[lib.url.parse(req.url).pathname]
  }));
});

router(cache.pageFilter(), function (req, res) {
  var pathname = lib.url.parse(req.url).pathname,
      // FIXME: async IO
      mdContent = lib.fs.readFileSync('pages' + pathname + '.md', 'utf8'),
      title = mdContent.match(/^#+\s?([^\n]+)/).pop();

  renderPage(res, 200, 'page', pageData({
    content: mdContent,
    title: title
  }));
});

// TODO: make this page more helpful/entertaining than it is
router('error', function (req, res) {
  renderPage(res, 404, 'error', pageData());
});
