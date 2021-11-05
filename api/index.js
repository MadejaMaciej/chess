const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const mongoose = require('mongoose')

const getters = require('./get/index')
const socketsMain = require('./sockets/index')

const register = require('./api/register')
const login = require('./api/login')
const logout = require('./api/logout')
const checkIfLoggedProperly = require('./api/checkIfValidTokens')

var app = express()
var server = http.createServer(app)
var io = socketio(server)

mongoose.connect('mongodb://localhost/chess', { useNewUrlParser: true,  useUnifiedTopology: true})
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err))

getters(app)
socketsMain(io)

app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/logout', logout)
app.use('/api/checkIfLoggedIn', checkIfLoggedProperly)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))