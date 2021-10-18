var socketsMain = (io) =>{
    var playerCounter = 0
    io.on('connection', (socket) => {
        joinRoom(socket, 'main')
        playerCounter++
        io.in('main').emit('displayPlayersOnline', playerCounter)
        socket.on('disconnect', ()=>{
            playerCounter--
            io.in('main').emit('displayPlayersOnline', playerCounter)
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