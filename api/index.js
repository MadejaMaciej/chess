const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const getters = require('./get/index')
const socketsMain = require('./sockets/index')

var app = express()
var server = http.createServer(app)
var io = socketio(server)

getters(app)
socketsMain(io)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))