export default function createKeyboardListener (document) {
    const state = {
        observers: []
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
            playerId: 'player1', 
            key: event.key
        }
        notifyAll(comand)
    }

    return {
        subscribe
    }
}