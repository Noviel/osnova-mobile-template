// Created by snov on 28.06.2016.
var path = require('path');
var appRoot = require('../config.js').app.root;

var prebuildString = 'OSNOVA-WEBPACK:';

console.log(prebuildString + '');
console.log(path.join(appRoot, 'client/js/'));

module.exports = {
  entry: { 
    main: path.join(appRoot, './src/code/client/index')
  },
  production: true
};