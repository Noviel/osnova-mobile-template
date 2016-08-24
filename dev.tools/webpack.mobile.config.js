var config = require('../config.js').webpack.mobile;
var webpackCommon = require('./webpack.common');
var webpackExport = webpackCommon.configure(config);

webpackCommon.loadBabel(webpackExport);
webpackCommon.loadCSS(webpackExport);
webpackCommon.loadPhaser(webpackExport);

if (config.production) {
  webpackCommon.uglify(webpackExport);
}

module.exports = webpackExport;