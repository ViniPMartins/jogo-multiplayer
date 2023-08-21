export default function createKeyboardListener (document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe (observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(comand) {
        //console.log(`Notifying ${state.observers.length} observers`)

        for (const observer of state.observers) {
            observer(comand)
        }
    }

    document.addEventListener('keydown', keyPress)

    function keyPress(event) {
        const comand = {
            type: 'move-player',
            playerId: state.playerId,
            key: event.key
        }
        notifyAll(comand)
    }

    return {
        subscribe,
        registerPlayerId
    }
}