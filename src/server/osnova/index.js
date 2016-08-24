// Created by snov on 29.06.2016.


const Http     = require('http'),
  path         = require('path'),
  contentTypes = require('../utils/content.types'),
  sysInfo      = require('../utils/sys.info'),
  config       = global.config;

import session from './session';
import express from 'express';
import mongoose from 'mongoose';

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

import Socket from './socket';

function routes(osnova, app) {

  app.get('/health', function(req,res) {
    res.header(200).send('I am ok!');
  });

  app.get('/', function(req, res) {
    if (!req.session.views) req.session.views = 1;
    else req.session.views++;

    res.render('index', { title: 'Hey', message: `views count: ${req.session.views}`});
  });
}

var OSNOVA = function(start, opts) {
  opts = opts || {};

  this.loadConfig(config);

  this.actions = {
    init: [],
    starting: []
  };

  if (start) {
    this.add('starting', start);
  }
};

OSNOVA.prototype = Object.create(null);
OSNOVA.prototype.constructor = OSNOVA;

OSNOVA.prototype.loadConfig = function (config) {
  this.config = config;
};

OSNOVA.prototype.add = function(state, action, args) {
  const dst = this.actions[state];
  if (!dst) {
    this.actions[state] = [];
  }

  this.actions[state].push({action: action, args: args});
};

OSNOVA.prototype.on = OSNOVA.prototype.add;

OSNOVA.prototype.defaultActions = function () {
  this.add('init', routes, this.express);
};

OSNOVA.prototype.preInit = function () {
  var app   = express();
  var http  = Http.Server(app);

  var io    = new Socket(http);

  io.socketEvent('disconnect', function () {
    console.log('client disconnected');
  });

  app.set('view engine', 'pug');
  app.set('views', config.path.views);

  app.use(express.static(config.path.public.web));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  session(app, {
    mongooseConnection: this.connection,
    secret: 'my big secret string',
    resave: false,
    saveUninitialized: false
  });

  this.express = app;
  this.io = io;
  this.http = http;

  this.defaultActions();
};

OSNOVA.prototype.__executeActions = function (list) {
  const count = list.length;
  var curr;
  for (var i = 0; i < count; i++) {
    curr = list[i];
    curr.action(this, curr.args);
  }
};

OSNOVA.prototype.initEvents = function () {
  this.__executeActions(this.actions.init);
};

OSNOVA.prototype.startingEvents = function () {
  this.__executeActions(this.actions.starting);
};

OSNOVA.prototype.connect = function () {
  const connectString = config.database.path + config.database.name;
  return this.connection = mongoose.connect(connectString).connection;
};


OSNOVA.prototype.launch = function () {
  this.preInit();
  this.initEvents();

  this.startingEvents();
  this.listen();
};

OSNOVA.prototype.listen = function () {
  const http = this.http,
        config = this.config;

  http.listen(config.host.port, config.host.ip, function () {
    console.log(`Application worker ${process.pid} started... ${config.host.ip}:${config.host.port}`);
  });
};

OSNOVA.prototype.start = function () {
  console.log('-----------------------------------------------------------');
  console.log('OSNOVA v.' + config.version);
  this.connect()
    .on('error', console.error.bind(console, 'Connection to MongoDB failed:'))
    .on('disconnected', this.connect)
    .once('open', () => {
      console.log('Connected to MongoDB.');
      this.launch();
    });
};

export default OSNOVA;