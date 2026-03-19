function hideNotifyScreen() {
    const notifyScreen = document.getElementById("notification-screen")
    notifyScreen.style.display = "none"
}

function showNotifyScreen() {
    const notifyScreen = document.getElementById("notification-screen")
    notifyScreen.style.display = "flex"
}

function showWarning(message, ok_event) {
    const warningMessage = document.querySelector(".warning p")
    warningMessage.style.display = "block"
    warningMessage.textContent = message
    showNotifyScreen()

    const okButton = document.getElementById("confirm-btn")
    okButton.onclick = () => {
        hideWarning()
        if (ok_event) {
            ok_event()
        }
    }
    
    const cancelButton = document.getElementById("cancel-btn")
    cancelButton.onclick = () => {
        hideWarning()
    }
}



function hideWarning() {
    const warningMessage = document.querySelector(".warning p")
    warningMessage.style.display = "none"
    warningMessage.textContent = ""
    hideNotifyScreen()
}