function showForm(existingUserId = null) {
    const formContainer = document.getElementById("form-screen");
    formContainer.style.display = "flex";

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

function hideForm() {
    clearForm();
    const formContainer = document.getElementById("form-screen");
    formContainer.style.display = "none";
}

function clearForm() {
    document.getElementById("form-title").textContent = "Agregar Usuario";
    document.getElementById("user-name").value = "";
    document.getElementById("user-phone").value = "";
    document.getElementById("user-email").value = "";
    document.getElementById("user-rfc").value = "";
    document.getElementById("user-curp").value = "";
    document.getElementById("user-id").value = null;
}

function submitForm() {
    const name  = document.getElementById("user-name").value.trim();
    const phone = document.getElementById("user-phone").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const rfc   = document.getElementById("user-rfc").value.trim().toUpperCase();
    const curp  = document.getElementById("user-curp").value.trim().toUpperCase();
    const id    = document.getElementById("user-id").value.trim();

    if (!validate({ name, phone, email, rfc, curp })) {
        return;
    }

    if(id) {
        updateUser(id, { name, phone, email, rfc, curp });
        hideForm();
        return;
    } 

    const newUser = {
        id: getNewUserId(),
        name: name,
        phone: phone,
        email: email,
        rfc: rfc,
        curp: curp
    };

    addUser(newUser);
    clearForm();
    hideForm();
}

function validate(data) {
    const { name, phone, email, rfc, curp } = data;

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