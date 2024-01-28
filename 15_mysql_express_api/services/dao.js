const orderQueries = require('./mysqlQueries/orderQueries')
const productQueries = require('./mysqlQueries/productQueries')
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

dao.addProductImage = async (imageData) => await productQueries.addProductImage(imageData)

dao.getImageById = async (id) => await productQueries.getImageById(id)

dao.addProduct = async (data) => await productQueries.addProduct(data)

dao.getProductByReference = async (reference) => await productQueries.getProductByReference(reference)

dao.addOrder = async (orderData) => await orderQueries.addOrder(orderData)

dao.getAllOrders = async () => await orderQueries.getAllOrders()

module.exports = dao
