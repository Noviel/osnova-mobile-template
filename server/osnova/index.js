'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Created by snov on 29.06.2016.

var http = require('http'),
    path = require('path'),
    contentTypes = require('../utils/content.types'),
    sysInfo = require('../utils/sys.info'),
    config = global.config,
    root = config.path.root;

function setupDatabase() {
  var connectString = config.database.path + config.database.name;
  _mongoose2.default.connect(connectString);

  var db = _mongoose2.default.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('connected to mongo');
  });

  return db;
}

function setupExpress(connection) {
  var app = (0, _express2.default)();

  app.set('view engine', 'pug');
  app.set('views', config.path.views);

  (0, _session2.default)(app, {
    mongooseConnection: connection,
    secret: 'my big secret string',
    resave: false,
    saveUninitialized: false
  });

  return app;
}

function routes(app) {
  app.get('/', function (req, res) {

    if (!req.session.views) req.session.views = 1;else req.session.views++;

    res.render('index', { title: 'Hey', message: 'views count: ' + req.session.views });
  });
}

var OSNOVA = function () {
  function OSNOVA() {
    _classCallCheck(this, OSNOVA);
  }

  _createClass(OSNOVA, [{
    key: 'setup',
    value: function setup() {
      this.connection = setupDatabase();
      this.expApp = setupExpress(this.connection);

      routes(this.expApp);
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