export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    const observers = []

    function subscribe (observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(comand) {
        for (const observer of observers) {
            observer(comand)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function start () {
        setInterval(addFruits, 2000)
    }

    function addPlayer (comand) {
        const playerId = comand.playerId
        const playerX = 'playerX' in comand ? comand.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in comand ? comand.playerY : Math.floor(Math.random() * state.screen.height)

        state.players[playerId] = {x: playerX, y: playerY}

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        })
    }

    function removePlayer(comand) {
        delete state.players[comand.playerId]
        notifyAll({
            type: 'remove-player',
            playerId: comand.playerId
        })
    }

    function addFruits (comand) {
        const fruitId = comand ? comand.fruitId : Math.floor(Math.random() * 1000000)
        const fruitX = comand ? comand.fruitX : Math.floor(Math.random() * state.screen.height)
        const fruitY = comand ? comand.fruitY : Math.floor(Math.random() * state.screen.height)

        state.fruits[fruitId] = {x: fruitX, y: fruitY}

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
    }

    function removeFruits(fruitId) {
        delete state.fruits[fruitId]
        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId
        })
    }

    function movePlayer(comand) {

        notifyAll(comand)

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
        removeFruits,
        setState,
        subscribe,
        start
    }
}