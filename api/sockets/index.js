const { matchmake } = require("../utils/game")

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

        socket.on('startMatchmaking', props => {
            matchmake(props.minutes, props.seconds, "Anonymous", 1500)
            console.log(props)
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