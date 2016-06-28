// Created by snov on 28.06.2016.
var config = require('./config'),
    platform = config.build.platform;

require('./server/' + platform + '.launcher');