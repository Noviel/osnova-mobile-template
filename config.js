// Created by snov on 28.06.2016.

var path = require('path');

const appRoot = path.resolve(__dirname);
const env = process.env;

const server = {
  launcher: 'default.launcher.js',
  path: './server'
};

function getDeployTargetConfig() {
  if (env.OPENSHIFT_APP_UUID)
    return require(path.resolve(server.path, './deploy/openshift.config.js'));

  return require(path.resolve(server.path, './deploy/local.config.js'));
}

const targetConfig = getDeployTargetConfig();

const paths = {
  root: appRoot,
  public: {
    web: path.resolve(appRoot, './public'),
    mobile: path.resolve(appRoot, './mobile/www')
  },
  views: path.resolve(appRoot, './private/views'),
  server:  path.resolve(appRoot, './server')
};

const config = {
  version: require(path.resolve(appRoot,'./package.json')).version,

  main: path.resolve(path.resolve(appRoot, server.path), server.launcher),

  //server: server,

  host: targetConfig.host,
  database: targetConfig.database,

  path: paths,

  webpack: {
    web: {
      public: paths.public.web,
      entry: {
        'js/index': path.join(appRoot, './src/client/index.js'),
        'css/index': path.join(appRoot, './src/styles/index.css')
      },
      production: false
    },

    mobile: {
      public: paths.public.mobile,
      entry: {
        'js/index': path.join(appRoot, './src/client/index.mobile.js'),
        'css/index': path.join(appRoot, './src/styles/index.css')
      },
      production: false
    }
  }
};

module.exports = config;
global.config = config;