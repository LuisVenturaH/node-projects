const express = require("express");
const authRouter = express.Router()

const { authPublic, authAutenticado, authAutorizado } = require('../controllers/authController.js')

const { USERS_BBDD } = require('../bbdd.js')

// Endpoint público (no autenticado y no autorizado)
authRouter.get("/public", authPublic)

// Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", authAutenticado)

// Endpoint autorizado a administradores
authRouter.post("/autorizado", authAutorizado)

module.exports = authRouter;