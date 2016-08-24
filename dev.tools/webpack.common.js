// Created by snov on 24.08.2016.
var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('../config.js')
  , root = config.path.root;

function getLoaders(config) {
  if (!config.module) {
    config.module = {}
  }
  if (!config.module.loaders) {
    config.module.loaders = [];
  }

  return config.module.loaders;
}

function getAlias(config) {
  if (!config.resolve) {
    config.resolve = {}
  }
  if (!config.resolve.alias) {
    config.resolve.alias = {}
  }

  return config.resolve.alias;
}

function getPlugins(config) {
  if (!config.plugins) {
    config.plugins = []
  }

  return config.plugins;
}

function addLoader(loaders, test, loader) {
  loaders.push({
    test: test,
    loader: loader
  });
}

function babel(config, opts) {
  opts = opts || {};
  const query = opts.query || {
    presets: ['es2015', 'stage-0']
  };

  var loaders = getLoaders(config);

  loaders.push({
    test: /\.jsx?$/,
    loader: 'babel',
    exclude: /(node_modules|bower_components)/,
    query: query
  })
}

function Phaser(config) {
  var phaserModule = path.join(root, '/node_modules/phaser/');

  var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
    , pixi = path.join(phaserModule, 'build/custom/pixi.js')
    , p2 = path.join(phaserModule, 'build/custom/p2.js');

  var loaders = getLoaders(config),
      alias = getAlias(config);

  addLoader(loaders, /pixi\.js/, 'expose?PIXI');
  addLoader(loaders, /p2\.js/, 'expose?p2');
  addLoader(loaders, /phaser-split\.js/, 'expose?Phaser');

  alias['phaser'] = phaser;
  alias['pixi'] = pixi;
  alias['p2'] = p2;
}

function CSS(config) {
  var loaders = getLoaders(config),
      plugins = getPlugins(config);

  addLoader(loaders, /\.css$/, ExtractTextPlugin.extract('style-loader', 'css-loader'));

  plugins.push(new ExtractTextPlugin('[name].css'));
}

function uglify(config, opts) {
  opts = opts || {
    compress: {
      warnings: false
    },
    output : {
      comments: false
    }
  };

  var plugins = getPlugins(config);

  plugins.push(new webpack.optimize.UglifyJsPlugin(opts));
}

function configure(opts) {
  const output = opts.output || {
    path: opts.public,
    filename: '[name].js',
    chunkFilename: '[id].js'
  };

  const debug = !opts.production,
        devtool = debug ? 'source-map' : '';

  return {
    entry: opts.entry,
    output: output,
    debug: debug,
    devtool: devtool
  }
}

module.exports = {
  configure: configure,
  loadCSS: CSS,
  loadPhaser: Phaser,
  loadBabel: babel,
  uglify: uglify
};
