const userModel = require('../services/schema/userSchema');

// Función para validar email y password
const checkEmailPassword = async (email, password) => {
    // Filtramos el email entre las cuentas de la base de datos
    const user = userModel.findOne({email});
    // Si el usuario no existe lanzamos un error
    if (!user) throw new Error();
    // Si la password no coincide con la recibida lanzamos una alerta
    if (user.password !== password) throw new Error();
    // Si todo es correcto devolvemos el usuario
    return user;
};

module.exports = checkEmailPassword;

// Si quisieramos exportar varias funciones la sintaxis es
// module.exports = {checkEmail, suma, resta, etc}