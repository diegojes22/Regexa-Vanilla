/**
 * @org: TecNM
 * @author: D -0x007EFF
 * Este archivo contiene las funciones necesarias para manejar el formulario de registro de usuario, 
 * incluyendo la validación de los campos del formulario utilizando expresiones regulares definidas 
 * en el objeto `userRegex`.
 * 
 * Esta parte del formulario tambien es muy importante para el ejercicio solicitado, ya que aquí se manejan 
 * las funciones necesarias para mostrar y ocultar el formulario de registro de usuario, validar el usuario,
 * y manejar el evento de envío del formulario para agregar o editar un usuario en la tabla de usuarios.
 */

/**
 * Esta función muestra el formulario de usuario, se utiliza para mostrar el formulario de registro o edición de usuario.
 * No es necesario llamarlo directamente en el HTML, ya que a la hora de hacer clic en el botón de **Agregar Usuario** o **Editar**,
 * 
 * @param {*} existingUserId 
 */
function showForm(existingUserId = null) {
    const formContainer = document.getElementById("form-screen");
    formContainer.style.display = "flex";

    // Si se proporciona un ID de usuario existente, cargar los datos del usuario en el formulario para su edición
    if (existingUserId) {
        const user = getUserById(existingUserId);
        if (user) {
            document.getElementById("form-title").textContent = "Editar Usuario";
            document.getElementById("user-id").value = user.id;
            document.getElementById("user-name").value = user.name;
            document.getElementById("user-phone").value = user.phone;
            document.getElementById("user-email").value = user.email;
            document.getElementById("user-rfc").value = user.rfc;
            document.getElementById("user-curp").value = user.curp;
        } else {
            hideForm();
            showWarning("Usuario no encontrado");
        }
    }
}

/**
 * Esta función oculta el formulario de usuario, se utiliza para cerrar el formulario de registro o edición de usuario.
 * No es necesario llamarlo directamente en el HTML, ya que a la hora de hacer clic en el botón de **Cancelar** o después de enviar el formulario,
 * se llama automáticamente para ocultar el formulario al usuario.
 * 
 * Esta función también se encarga de limpiar los campos del formulario para que no queden datos residuales cuando se vuelva a abrir el formulario 
 * para agregar un nuevo usuario.
 * 
 * @return {void}
 * @param {void}
 */
function hideForm() {
    clearForm();
    const formContainer = document.getElementById("form-screen");
    formContainer.style.display = "none";
}

/**
 * Esta función limpia los campos del formulario de usuario, se utiliza para limpiar los campos del formulario de registro o edición de usuario.
 * No es necesario llamarlo directamente en el HTML, ya que a la hora de ocultar el formulario, se llama automáticamente para limpiar los campos 
 * del formulario al usuario.
 */
function clearForm() {
    document.getElementById("form-title").textContent = "Agregar Usuario";
    document.getElementById("user-name").value = "";
    document.getElementById("user-phone").value = "";
    document.getElementById("user-email").value = "";
    document.getElementById("user-rfc").value = "";
    document.getElementById("user-curp").value = "";
    document.getElementById("user-id").value = null;
}

/**
 * Funcion encargada de manejar el evento de envio del formulario. Ya incluye la validacion de los campos
 * usando REGEX definidos en el objeto `userRegex`, por lo que no es necesario llamar a la función de validación por separado.
 * 
 * No es necesario llamarlo directamente en el HTML, ya que a la hora de hacer clic en el botón de **Guardar**,
 * se llama automáticamente para manejar el evento de envío del formulario.
 * @returns 
 */
function submitForm() {
    // Obtener los valores de los campos del formulario
    const name  = document.getElementById("user-name").value.trim();
    const phone = document.getElementById("user-phone").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const rfc   = document.getElementById("user-rfc").value.trim().toUpperCase();
    const curp  = document.getElementById("user-curp").value.trim().toUpperCase();
    const id    = document.getElementById("user-id").value.trim();

    // Validar los campos del formulario utilizando las expresiones regulares definidas en userRegex
    if (!validate({ name, phone, email, rfc, curp })) {
        return;
    }

    // Si el ID del usuario existe, significa que estamos editando un usuario existente, por lo que se actualizan los datos del usuario.
    if(id) {
        updateUser(id, { name, phone, email, rfc, curp });
        hideForm();
        return;
    } 

    // Si no existe el ID del usuario, significa que estamos agregando un nuevo usuario, por lo que 
    // se crea un nuevo objeto de usuario y se agrega a la tabla.
    const newUser = {
        id: getNewUserId(),
        name: name,
        phone: phone,
        email: email,
        rfc: rfc,
        curp: curp
    };

    addUser(newUser);

    // Al finalizar cerramos el formulario y limpiamos los campos.
    clearForm();
    hideForm();
}

/**
 * Función encargada de validar los datos del usuario con REGEX definidos en el objeto `userRegex`. 
 * Si algún campo no cumple con la expresión regular correspondiente, se muestra una advertencia al usuario indicando c
 * uál campo es inválido.
 * 
 * @param {*} data : Objeto que contiene los datos del usuario a validar, debe contener las propiedades: name, phone, email, rfc y curp.
 * @returns {boolean}
 */
function validate(data) {
    const { name, phone, email, rfc, curp } = data;

    // Ya se que esto se puede hacer de forma mas bonita
    // sin tantos IFs, pero me dio flojera
    // :)
    if (!userRegex.name.test(name)) {
        showWarning("Nombre inválido");
        return false;
    }
    if (!userRegex.phone.test(phone)) {
        showWarning("Teléfono inválido");
        return false;
    }
    if (!userRegex.email.test(email)) {
        showWarning("Correo electrónico inválido");
        return false;
    }
    if (!userRegex.rfc.test(rfc)) {
        showWarning("RFC inválido");
        return false;
    }
    if (!userRegex.curp.test(curp)) {
        showWarning("CURP inválida");
        return false;
    }

    return true;
}