export default function loginPlayer() {
    const state = {
        observers: []
    }

    function subscribe (observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(comand) {
        for (const observer of state.observers) {
            observer(comand)
        }
    }
            
    function verifyPlayer (document) {
        const user = document.querySelector(".input-user").value

        if (user === "") {
            alert("Insira um usuário")
        } 
        else {
            const comand = {
                type: 'login-player',
                playerName: user
            }

            notifyAll(comand)
        }
    }

    return {
        subscribe,
        notifyAll,
        verifyPlayer
    }

}