export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {

    const context = screen.getContext('2d')

    clearScreen()

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]

        //console.log(`> Current player ${currentPlayerId}`)
        //console.log(`> PlayerId ${playerId}`)

        if (playerId === currentPlayerId) {
            context.fillStyle = '#F0DB4F'
        } else {
            context.fillStyle = 'black'
        }

        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    function clearScreen() {
        context.fillStyle = 'white'
        context.clearRect(0, 0, 10, 10)
    }

    const scoreTable = document.getElementById("score-table")
    createScoreTable(game.state)

    function createScoreTable(state) {

        const playerSorted = []

        for (const playerId in state.players) {
            const player = state.players[playerId]
            playerSorted.push({playerId: playerId, playerName: player.playerName, score: player.score})
        }

        playerSorted.sort((a, b) => { return b.score - a.score})

        let html = ''

        html += `<tr class="header">
                    <td>
                        Jogadores
                    </td>
                </tr>`

        for (const idx in playerSorted) {
                const player = playerSorted[idx]

                html += `<tr>
                            <td>
                                ${player.playerName}
                            </td>
                            <td class="score">
                                ${player.score}
                            </td>
                        </tr>`
        }

        scoreTable.innerHTML = html
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
    })
}