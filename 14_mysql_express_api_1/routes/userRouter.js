const express = require('express')
const { addUser, loginUser, updateUser, deleteUser, getUsers } = require('../controllers/userController')

const userRouter = express.Router()

// ruta para añadir usuario
userRouter.post('/', addUser)

// Ruta para loguear usuario
userRouter.post("/login", loginUser)

// Modifica usuario por su Id
userRouter.patch("/:id", updateUser)

// Elimina usuario
userRouter.delete("/:id", deleteUser)

// Lista usuarios de la base de datos
userRouter.get("/", getUsers)

module.exports = userRouter


