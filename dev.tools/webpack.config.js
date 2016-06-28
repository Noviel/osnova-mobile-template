var path = require('path');
var webpack = require('webpack');

var pj = path.join, pr = path.resolve;

var config = require('../config.js'),
    root = config.app.root,
    wc = config.webpack;


module.exports = {
  entry: wc.entry,

  output: {
    path: pj(root, 'client/js/'),
    filename: '[name].js'
  },

  debug: !wc.production,
  devtool: !wc.production ? 'source-map' : '',

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