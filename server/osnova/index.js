'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Created by snov on 29.06.2016.

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http'),
    path = require('path'),
    contentTypes = require('../utils/content.types'),
    sysInfo = require('../utils/sys.info'),
    root = config.path.root;

var OSNOVA = function () {
  function OSNOVA() {
    _classCallCheck(this, OSNOVA);
  }

  _createClass(OSNOVA, [{
    key: 'setup',
    value: function setup() {

      this.expApp = (0, _express2.default)();

      var app = this.expApp;

      app.set('view engine', 'pug');
      app.set('views', path.join(root, '/private/views'));

      app.get('/', function (req, res) {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var app = this.expApp;

      app.listen(config.deploy.port, function () {
        console.log('Application worker ' + process.pid + ' started... ' + config.deploy.ip + ':' + config.deploy.port);
      });
    }
  }]);

  return OSNOVA;
}();

exports.default = OSNOVA;