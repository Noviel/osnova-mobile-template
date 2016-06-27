var path = require('path');
var webpack = require('webpack');

console.log('using ' + __filename);

const pj = path.join, pr = path.resolve;

module.exports = {
  entry: {
    main: './src/code/client/index'
  },

  output: {
    path: pj(__dirname, 'client/js/'),
    filename: '[name].js'
  },

  debug: true,
  devtool: 'source-map',

  resolveLoader: {
    root: pj(__dirname, 'node_modules')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [ pr(__dirname, 'src') ]
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