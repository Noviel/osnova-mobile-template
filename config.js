// Created by snov on 28.06.2016.

var path = require('path');

const appRoot = path.resolve(__dirname);
const env = process.env;

const server = {
  launcher: 'default.launcher.js',
  path: './server'
};

const config = {
  main: path.resolve(path.resolve(appRoot, server.path), server.launcher),

  database: {
    path: 'mongodb://localhost/',
    name: 'osnova'
  },

  server: server,

  deploy: {
    port: env.NODE_PORT || 3000,
    ip: env.NODE_IP || 'localhost'
  },  


  path: {
    root: appRoot,
    public: path.resolve(appRoot, './public'),
    views: path.resolve(appRoot, './private/views'),
    server:  path.resolve(appRoot, './server')
  },

  webpack: {
    entry: {
      main: path.join(appRoot, './src/client/index')
    },
    production: true
  }
};

module.exports = config;
global.config = config;