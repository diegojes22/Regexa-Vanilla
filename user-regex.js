/**
 * Este objeto contiene las expresiones regulares para validar los campos del formulario de registro de usuario.
 * 
 * Esta es la parte importante del ejercicio solicitado, ya que aqui se definen las expresiones regulares para validar cada uno 
 * de los campos del formulario de registro de usuario, como el nombre, correo electrónico, teléfono, RFC y CURP. Todo
 * esto es lo pedido en el ejercicio, el resto del código es solo para manejar la tabla de usuarios y las advertencias, 
 * simulando un sistema de gestión (CRUD) de usuarios básico para darle un valor agregado al ejercicio.
 */

const userRegex = {
    name: /^([A-ZÑ][a-zñ]+)(\s[A-ZÑ][a-zñ]+)?(\s[A-ZÑ][a-zñ]+)(\s[A-ZÑ][a-zñ]+)?$/,
    email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    phone : /^\d{10}$/,
    rfc: /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/,
    curp: /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
}