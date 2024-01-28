const userQueries = require('./mysqlQueries/userQueries')

const dao = {}

// Busca un usuario por email
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email)
// Añadir nuevo usuario
dao.addUser = async (userData) => await userQueries.addUser(userData)
// Buscar un usuario por id
dao.getUserById = async (id) => await userQueries.getUserById(id)
// Para eliminar usuario
dao.deleteUser = async (id) => await userQueries.deleteUser(id)
// Para actualizar usuario
dao.updateUser = async (id, userData) => await userQueries.updateUser(id, userData)

dao.getUsers = async () => await userQueries.getUsers()

module.exports = dao