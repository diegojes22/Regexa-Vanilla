/**
 * @organization: TecNM
 * @author: D -0x007EFF
 * 
 * Este archivo contiene las funciones necesarias para manejar y mostrar
 * advertencias y notificaciones al usuario.
 * 
 * Este es valor agregado para el ejercicio.
 */

/**
 * Esta funcion oculta la pantalla de notificacion, se utiliza para cerrar cualquier 
 * mensaje de advertencia o notificación que se esté mostrando.
 * 
 * No es necesario llamarlo ya que a la hora de mostrar una notificación o advertencia, 
 * se asignan eventos a los botones de confirmación y cancelación para ocultar la 
 * pantalla de notificación cuando se haga clic en ellos.
 * 
 * @return {void}
 * @param {void}
 */
function hideNotifyScreen() {
    const notifyScreen = document.getElementById("notification-screen")
    notifyScreen.style.display = "none"
}

/**
 * Esta función muestra la pantalla de notificación, se utiliza para mostrar 
 * cualquier mensaje de advertencia o notificación al usuario.
 * 
 * No es necesario llamarlo directamente, ya que a la hora de mostrar una notificación o advertencia,
 * se llama automáticamente para mostrar la pantalla de notificación al usuario.
 * 
 * @return {void}
 * @param {void}
 */
function showNotifyScreen() {
    const notifyScreen = document.getElementById("notification-screen")
    notifyScreen.style.display = "flex"
}

/**
 * 
 * @param message {Mensaje a mostrar en la advertencia}
 * @param ok_event {Evento a ejecutar en caso de que se presione el boton de **aceptar**} 
 */
function showWarning(message, ok_event) {
    const warningMessage = document.querySelector(".warning p")
    warningMessage.style.display = "block"
    warningMessage.textContent = message
    showNotifyScreen()

    // Asignar el evento al botón de confirmación
    const okButton = document.getElementById("confirm-btn")
    okButton.onclick = () => {
        hideWarning()
        if (ok_event) {
            ok_event()
        }
    }
    
    // Asignar el evento al botón de cancelación
    const cancelButton = document.getElementById("cancel-btn")
    cancelButton.onclick = () => {
        hideWarning()
    }
}

/**
 * Esta función oculta la advertencia, se utiliza para cerrar cualquier mensaje de advertencia que se esté mostrando.
 * 
 * No es necesario llamarlo directamente, ya que a la hora de mostrar una notificación o advertencia,
 * se llama automáticamente para ocultar la pantalla de notificación al usuario.
 * 
 * @return {void}
 * @param {void}
 */
function hideWarning() {
    const warningMessage = document.querySelector(".warning p")
    warningMessage.style.display = "none"
    warningMessage.textContent = ""
    hideNotifyScreen()
}