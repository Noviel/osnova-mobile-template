// Created by snov on 13.07.2016.
const env = process.env;

module.exports = {
  host: {
    port: env.NODE_PORT || 8080,
    ip: env.NODE_IP || '127.0.0.1'
  },
  database: {
    path: env.MONGODB_URL,
    name: 'dequartum'
  }
};