var http = require('http'),
    lib = require('modmod')('fs', 'url'),

    // local resources
    cache = require('./resources/cache'),
    contentTypes = require('./resources/contentTypes'),
    router = require('./resources/router'),

    devPort = 9000,
    localPort = process.env.PORT,
    thirtyMinutes = 30 * 60 * 1000;

cache.build();

require('./resources/routes');

function ping() {
  http.get('http://kalisjoshua.me');
  setTimeout(ping, thirtyMinutes);
}

function requestHandler(req, res) {
  var fileExt,
      url = lib.url.parse(req.url);

  // update the cache, during development
  if (/^update$/i.test(url.query)) {
    cache.build();
  }

  // check for assets files first since more requests
  // will come in for those than any other route.
  if (cache.passive.indexOf(url.pathname) > -1) {
    fileExt = url.pathname
      .match(/\w+$/i)
      .pop();

    res.writeHead(200, contentTypes[fileExt]);

    lib.fs
      .createReadStream('public' + url.pathname)
      .pipe(res);
  } else {
    // use the route handler defined in the router or
    // the error route handler as the default if not found
    (router(url.pathname) || router('error'))(req, res);
  }
}

require('http')
  .createServer(requestHandler)
  .listen(localPort || devPort);

if (!localPort) {
  console.log('Server running at - http://localhost:' + devPort);
} else {
  ping();
}
