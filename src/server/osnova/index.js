// Created by snov on 29.06.2016.


const http     = require('http'),
  path         = require('path'),
  contentTypes = require('../utils/content.types'),
  sysInfo      = require('../utils/sys.info'),
  config       = global.config,
  root         = config.path.root;

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
}

function setupExpress() {
  const app = express();
  
  app.set('view engine', 'pug');
  app.set('views', config.path.views);

  app.get('/', function(req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
  });

  return app;
}

export default class OSNOVA {
  constructor() {
  }

  setup() {

    setupDatabase();

    this.expApp = setupExpress();
  }

  start() {
    const app = this.expApp;

    app.listen(config.deploy.port, function() {
      console.log(`Application worker ${process.pid} started... ${config.deploy.ip}:${config.deploy.port}`);
    });
  }
}