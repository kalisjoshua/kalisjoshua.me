var express = require('express'),
    swig    = require('swig'),

    info = require('./package.json');

info.currentYear = new Date()
  .getFullYear();

express()
  .engine('html', swig.renderFile)

  .use(express.static(__dirname + '/public'))

  .get('*', function (req, res) {
    info.path = req.url;
    res.render('index', info);
  })

  .set('view engine', 'html')
  .set('views', __dirname + '/swig')

  .listen(3000);
