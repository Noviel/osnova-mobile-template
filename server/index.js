'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // Created by snov on 22.06.2016.

var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    contentTypes = require('./utils/content.types'),
    sysInfo = require('./utils/sys.info'),
    env = process.env;

var port = env.NODE_PORT || 3000,
    ip = env.NODE_IP || 'localhost';

app.get('/', function (req, res) {
  res.send('Hell, Wow!');
});

app.listen(port, function () {
  console.log('Application worker ' + process.pid + ' started... ' + ip + ':' + port);
});