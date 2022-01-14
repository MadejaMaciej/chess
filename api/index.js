const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const mongoose = require('mongoose')

const getters = require('./get/index')
const socketsMain = require('./sockets/index')
const { gameUtils } = require('./utils/game')

const register = require('./api/register')
const login = require('./api/login')
const checkIfLoggedProperly = require('./api/checkIfValidTokens')

var cors = require("cors")
var app = express()
var server = http.createServer(app)
var io = socketio(server)

mongoose.connect('mongodb://localhost/chess', { useNewUrlParser: true,  useUnifiedTopology: true})
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err))

getters(app)
socketsMain(io)
gameUtils(io)

app.use(cors())

app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/checkIfLoggedIn', checkIfLoggedProperly)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))