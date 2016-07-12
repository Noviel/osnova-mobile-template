'use strict';

// Created by snov on 12.07.2016.

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

function SNVSession(app, config) {
  if (!config.store) {
    config.store = new MongoStore({ mongooseConnection: config.mongooseConnection });
  }

  app.use(session(config));
}

module.exports = SNVSession;