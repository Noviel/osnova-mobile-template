// Created by snov on 22.06.2016.

import express from 'express';

const app = express();


const http     = require('http'),
  fs           = require('fs'),
  path         = require('path'),
  contentTypes = require('./utils/content.types'),
  sysInfo      = require('./utils/sys.info'),
  env          = process.env;

let port = env.NODE_PORT || 3000,
  ip = env.NODE_IP || 'localhost';

app.get('/', function(req, res) {
  res.send('Hell, Wow!')
});

app.listen(port, function() {
  console.log(`Application worker ${process.pid} started... ${ip}:${port}`);
});