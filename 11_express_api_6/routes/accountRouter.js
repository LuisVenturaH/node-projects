const express = require('express')
const {listUser, addUser, updateUser, deleteUser} = require('../controllers/accountController')

const accountRouter = express.Router()

// Obtener los detalles de una cuenta
accountRouter.get('/:guid', listUser)

// Crear una cuenta nueva
accountRouter.post('/', addUser)

// Actualizar una cuenta nueva
accountRouter.patch('/:guid', updateUser)

// Eliminar una cuenta
accountRouter.delete('/:guid', deleteUser)

module.exports = accountRouter

