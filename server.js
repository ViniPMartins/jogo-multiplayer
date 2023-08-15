import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`Connection with Id: ${playerId}`)

    sockets.emit('setup', game.state)
})

server.listen(3000, () => {
    console.log('Server listening on port: 3000')
})
