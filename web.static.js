var express = require('express');

// var app = express.createServer(express.logger(), express.static(__dirname + '/public'));
// var app = express.createServer(express.static(__dirname + '/public'));

express
  .createServer(express.static(__dirname + '/public'))
  .listen(process.env.PORT || 3000)
  .get('/', function(req, res) {
    res.redirect('/index.html');
  });
