const users = {};

user_1 = {
    id: 1,
    name: "Juan",
    phone: "1234567890",
    email: "example@gmail.com",
    rfc: "DOEJ010101HMCRLN09",
    curp: "CURP1234567890123"
}

user_2 = {
    id: 2,
    name: "Maria",
    phone: "9876543210",
    email: "maria@example.com",
    rfc: "EXAMPLE1234567890",
    curp: "CURP4567890123456"
}

function addRow(user) {
    const table = document.getElementById("table-body");

    const newRow = document.createElement("tr");
    newRow.id = `row-${user.id}`; // Asigna un ID único a la fila
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

function clearTable() {
    document.getElementById("table-body").innerHTML = "";
}

function loadUsers() {
    clearTable();
    for (const id in users) {
        addRow(users[id]);
    }
}

function getUserById(id) {
    return users[id] || null;
}

function updateUser(id, updatedData) {
    if (users[id]) {
        users[id] = { ...users[id], ...updatedData };
        loadUsers();
    } else {
        showWarning("Usuario no encontrado");
    }
}

function addUser(user) {
    users[user.id] = user; // Agrega el usuario al objeto users
    addRow(user);
}

function deleteUser(id) {
    delete users[id];
    const row = document.getElementById(`row-${id}`);
    if (row) {
        row.remove();
    }
}

function getNewUserId() {
    return Object.keys(users).length > 0 ? Math.max(...Object.keys(users).map(Number)) + 1 : 1;
}

addUser(user_1);
addUser(user_2);