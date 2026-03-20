
/**
 * Este arreglo de objetos JSON simulara nuestra base de datos de usuariuos, cada objeto
 * representa un usuario con sus respectivos campos: id, name, phone, email, rfc y curp.
 * 
 * La forma de interactuar con esta "base de datos" es a través de las funciones definidas en este archivo.
 */
const users = [
    {
        id: 1,
        name: "Juan",
        phone: "1234567890",
        email: "example@gmail.com",
        rfc: "DOEJ010101HMCRLN09",
        curp: "CURP1234567890123"
    },
    {
        id: 2,
        name: "Maria",
        phone: "9876543210",
        email: "maria@example.com",
        rfc: "EXAMPLE1234567890",
        curp: "CURP4567890123456"
    }
];

/**
 * Agrega una fila a la tabla HTML para representar un usuario.
 * @param {usuario a agregar en la tabla HTML} user 
 */
function addRow(user) {
    const table = document.getElementById("table-body");

    const newRow = document.createElement("tr");
    newRow.id = `row-${user.id}`; // Asigna un ID único a la fila

    // Los datos se agregan mediante codigo HTML embebido
    newRow.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.phone}</td>
        <td>${user.email}</td>
        <td>${user.rfc}</td>
        <td>${user.curp}</td>
        <td>
            <button class="btn btn-editar" onclick="showForm(${user.id})">Editar</button>
            <button class="btn btn-eliminar" onclick="showWarning('¿Seguro que desea eliminar el usuario ${user.id}?', () => deleteUser(${user.id}))">Eliminar</button>
        </td>
    `;
    table.appendChild(newRow);
}

/**
 * Elimina todas las filas de la tabla HTML, se utiliza para limpiar la tabla antes de cargar los usuarios nuevamente.
 */
function clearTable() {
    document.getElementById("table-body").innerHTML = "";
}

/**
 * Carga los usuarios en la tabla HTML, se utiliza para mostrar los usuarios almacenados en el arreglo `users` en la tabla HTML.
 * Puede ser utilizada para actualizar toda la tabla, aunque puede ir muy lento si hay muchos usuarios.
 */
function loadUsers() {
    clearTable();
    for (const id in users) {
        addRow(users[id]);
    }
}

/**
 * Obtiene un usuario por su ID. Util para cuando queremos actualizar un usuario, ya que necesitamos cargar sus datos en el formulario para editarlos.
 * 
 * @param {number} id 
 * @returns {object|null} El usuario con el ID especificado, o null si no se encuentra.
 */
function getUserById(id) {
    return users[id] || null;
}

/**
 * Actualiza los datos de un usuario por su ID.
 * @param {number} id 
 * @param {object} updatedData 
 */
function updateUser(id, updatedData) {
    if (users[id]) {
        users[id] = { ...users[id], ...updatedData };
        loadUsers();
    } else {
        showWarning("Usuario no encontrado");
    }
}

/**
 * Agrega un usuario a la "base de datos" y lo muestra en la tabla HTML.
 * @param {object} user 
 */
function addUser(user) {
    users[user.id] = user; // Agrega el usuario al objeto users
    addRow(user);
}

/**
 * Elimina un usuario de la "base de datos" y lo remueve de la tabla HTML.
 * @param {number} id 
 */
function deleteUser(id) {
    delete users[id];
    const row = document.getElementById(`row-${id}`);
    if (row) {
        row.remove();
    }
}

/**
 * Se utiliza cuando se quiere agregar un nuevo usuario, ya que se necesita generar un ID único para el nuevo usuario.
 * El ID se genera tomando el ID más alto actualmente en la "base de datos" y sumándole 1, si no hay usuarios, el ID inicial será 1.
 * @returns 
 */
function getNewUserId() {
    return Object.keys(users).length > 0 ? Math.max(...Object.keys(users).map(Number)) + 1 : 1;
}