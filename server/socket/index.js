var http = require('http');
var socket = require('socket.io');

var io = null

module.exports = {

    connect: (app) => {
        server = http.Server(app)
        io = socket(server)

        io.on("connection", (socket) => {
            console.log('connected')
            // require('./events')(socket)
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