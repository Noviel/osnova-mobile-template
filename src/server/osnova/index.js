// Created by snov on 29.06.2016.

import express from 'express';

const http     = require('http'),
  path         = require('path'),
  contentTypes = require('../utils/content.types'),
  sysInfo      = require('../utils/sys.info'),
  config       = global.config,
  root         = config.path.root;

export default class OSNOVA {
  constructor() {
  }

  setup() {

    this.expApp = express();

    const app = this.expApp;

    app.set('view engine', 'pug');
    app.set('views', path.join(root, '/private/views'));
    
    app.get('/', function(req, res) {
      res.render('index', { title: 'Hey', message: 'Hello there!'});
    });

  }

  start() {
    const app = this.expApp;

    app.listen(config.deploy.port, function() {
      console.log(`Application worker ${process.pid} started... ${config.deploy.ip}:${config.deploy.port}`);
    });
  }
}