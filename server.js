import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()
game.start()

game.subscribe((comand) => {
    sockets.emit(comand.type, comand)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`SERVER Connection with Id: ${playerId}`)

    game.addPlayer({playerId: playerId})

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId})
        console.log(`SERVER Player disconnected: ${playerId}`)
    })

    socket.on('move-player', (comand) => {
        comand.playerId = playerId
        comand.type = 'move-player'

        game.movePlayer(comand)
    })
})

server.listen(3000, () => {
    console.log('Server listening on port: 3000')
})
