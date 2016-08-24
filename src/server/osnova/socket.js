// Created by snov on 17.08.2016.
var IO = require('socket.io');

export default class Socket {
  constructor(http) {

    this.events = {
      connection: {}
    };

    var io = IO(http);

    this.io = io;

    var self = this;

    io.on('connection', function (socket) {
      console.log('client connected');

      var list = self.events.connection;
      for (var i in list) {
        socket.on(i, list[i].event);
      }
    });
  }

  currentSocket() {

  }

  socketEvent(name, event) {
    this.events.connection[name] = { event: event };
  }
}