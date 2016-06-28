var path = require('path');
var webpack = require('webpack');
var config = require('../config/webpack');

var pj = path.join, pr = path.resolve;
var root = require('../config.js').app.root;


module.exports = {
  entry: config.entry,

  output: {
    path: pj(root, 'client/js/'),
    filename: '[name].js'
  },

  debug: !config.production,
  devtool: !config.production ? 'source-map' : '',

  resolveLoader: {
    root: pj(root, 'node_modules')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [ pr('root', 'src') ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    new webpack.OldWatchingPlugin()
  ]
};