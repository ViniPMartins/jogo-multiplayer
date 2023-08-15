export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer (comand) {
        const playerId = comand.playerId
        const playerX = comand.playerX
        const playerY = comand.playerY

        state.players[playerId] = {x: playerX, y: playerY}
    }

    function removePlayer(playerId) {
        delete state.players[playerId]
    }

    function addFruits (comand) {
        const fruitId = comand.fruitId
        const fruitX = comand.fruitX
        const fruitY = comand.fruitY

        state.fruits[fruitId] = {x: fruitX, y: fruitY}
    }

    function removeFruits(fruitId) {
        delete state.fruits[fruitId]
    }

    function movePlayer(comand) {

        const acceptedMoves = {
            ArrowUp (player) {
                if (player.y - 1 >= 0) {
                    player.y -= 1
                }
            },
            ArrowDown (player) {
                if (player.y + 1 < state.screen.height) {
                    player.y += 1
                }
            },
            ArrowRight (player) {
                if (player.x + 1 < state.screen.width) {
                    player.x += 1
                }
            },
            ArrowLeft (player) {
                if (player.x - 1 >= 0) {
                    player.x -= 1
                }
            }
        }

        const playerId = comand.playerId
        const player = state.players[playerId]
        const keyPressed = comand.key
        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkColisionFruits(playerId)
        }
    }

    function checkColisionFruits (playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            //console.log(`Verify colision with ${playerId} and ${fruitId}`)
            const fruit = state.fruits[fruitId]
            if (player.x == fruit.x && player.y == fruit.y) {
                //console.log(`Colision with ${playerId} and ${fruitId}`)
                removeFruits(fruitId)
            }
        }
    }

    return {
        state,
        movePlayer,
        addPlayer,
        removePlayer,
        addFruits,
        removeFruits
    }
}