import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()

game.subscribe((comand) => {
    console.log(`> Emiting ${comand.type}`)
    sockets.emit(comand.type, comand)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`Connection with Id: ${playerId}`)

    game.addPlayer({playerId: playerId})

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId})
        console.log(`Player disconnected: ${playerId}`)
    })
})

server.listen(3000, () => {
    console.log('Server listening on port: 3000')
})
