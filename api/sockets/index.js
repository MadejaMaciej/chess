const { matchmake, removeById } = require("../utils/game")
const { User } = require("../models/users")
const { checkIfBlocked } = require("../utils/block")
const { checkToken, askNewToken } = require("../utils/tokens")

var socketsMain = (io) =>{
    var playerCounter = 0
    var gamesCounter = 0
    io.on('connection', (socket) => {
        joinRoom(socket, 'main')
        playerCounter++
        io.in('main').emit('displayPlayersOnline', (playerCounter, gamesCounter))

        socket.on('enteredMain', () => {
            socket.emit('displayPlayersOnline', (playerCounter, gamesCounter))
        })

        socket.on('startMatchmaking', async (props) => {
            if(!props.username || !props.token || !props.refreshToken){
                var added = matchmake(props.minutes, props.seconds, "Anonymous", 1500, socket.id, true)
                if(added){
                    return socket.emit('PlayerAddedToQueue')
                }
                return socket.emit('SomethingWentWrong')
            }
            
            var user = await User.findOne({username: props.username})
            if(!user){
                return socket.emit('UserNotFound')
            }

            if(checkIfBlocked(user)){
                return socket.emit('Blocked')
            }

            var check = checkToken(user.token, props.token)
            if(!check){
                check = await askNewToken(user.refreshToken, props.refreshToken, user)
                if(!check){
                    return socket.emit('NotAuthorized')
                }
                
                var added = matchmake(props.minutes, props.seconds, user.username, user.ratings[0].rating, socket.id, false)
                if(added){
                    return socket.emit('PlayerAddedToQueue', ({token: check}))
                }
                return socket.emit('SomethingWentWrong')
            }
            
            var added = matchmake(props.minutes, props.seconds, user.username, user.ratings[0].rating, socket.id, false)
            if(added){
                return socket.emit('PlayerAddedToQueue')
            }
            return socket.emit('SomethingWentWrong')
        })
        
        socket.on('gameStarted', () => {
            gamesCounter++
            io.in('main').emit('displayPlayersOnline', (playerCounter, gamesCounter))
        })

        socket.on('gameEnded', () => {
            gamesCounter--
            io.in('main').emit('displayPlayersOnline', (playerCounter, gamesCounter))
        })

        socket.on('disconnect', ()=>{
            playerCounter--
            io.in('main').emit('displayPlayersOnline', (playerCounter, gamesCounter))
            removeById(socket.id)
        })
    })
}

var joinRoom = (socket, room) => {
    socket.join(room)
}

var leaveRoom = (io, socket, room) => {
    socket.leave(room)
    io.in(room).emit('userDisconneceted')
}

module.exports = socketsMain