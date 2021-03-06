var http = require('http');
var socket = require('socket.io');

var io = null

module.exports = {

    connect: (server) => {
        io = socket(server, {
            cors: {
              origin: '*',
            }
          })

        io.on("connection", (socket) => {
            console.log('connected')
        })
    },

    emit: (on, data) => {
        if (io) {
            io.emit(on, data);
        }
    },

    get: () => {
        return io
    }
}