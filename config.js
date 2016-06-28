// Created by snov on 28.06.2016.

var path = require('path');

global.appRoot = path.resolve(__dirname);

module.exports = {
  build: {
    platform: 'specific.platform'
  },
  
  app: {
    root: path.resolve(__dirname)
  },

  webpack: {
    entry: {
      main: path.join(appRoot, './src/code/client/index')
    },
    production: true
  }
};