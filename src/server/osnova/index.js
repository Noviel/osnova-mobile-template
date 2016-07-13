// Created by snov on 29.06.2016.


const http     = require('http'),
  path         = require('path'),
  contentTypes = require('../utils/content.types'),
  sysInfo      = require('../utils/sys.info'),
  config       = global.config;

import session from './session';
import express from 'express';
import mongoose from 'mongoose';

function setupDatabase() {
  const connectString = config.database.path + config.database.name;
  mongoose.connect(connectString);

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('connected to mongo');
  });

  return db;
}

function setupExpress(connection) {
  const app = express();

  app.set('view engine', 'pug');
  app.set('views', config.path.views);

  app.use(express.static(config.path.public));

  session(app, {
    mongooseConnection: connection,
    secret: 'my big secret string',
    resave: false,
    saveUninitialized: false
  });

  return app;
}

function routes(app) {
  app.get('/health', function (req,res) {
    res.header(200).send('I am ok!');
  });

  app.get('/', function(req, res) {
    if (!req.session.views) req.session.views = 1;
    else req.session.views++;

    res.render('index', { title: 'Hey', message: `views count: ${req.session.views}`});
  });
}

export default class OSNOVA {
  constructor() {
  }

  setup() {
    this.connection = setupDatabase();
    this.expApp = setupExpress(this.connection);

    routes(this.expApp);
  }

  start() {
    const app = this.expApp;

    app.listen(config.deploy.port, config.deploy.ip, function() {
      console.log('-----------------------------------------------------------');
      console.log(`Application worker ${process.pid} started... ${config.deploy.ip}:${config.deploy.port}`);
    });
  }
}