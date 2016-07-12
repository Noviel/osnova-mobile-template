var path = require('path');
var webpack = require('webpack');

var pj = path.join, pr = path.resolve;

var config = require('../config.js')
  , root = config.path.root
  , pub = config.path.public
  , wc = config.webpack;


module.exports = {
  entry: wc.entry,

  output: {
    path: pj(pub, 'js/'),
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
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'stage-0']
        }
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