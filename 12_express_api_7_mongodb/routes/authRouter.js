const express = require("express");
const { authPublic, authAutenticado, authAutorizado } = require('../controllers/authController')

const authRouter = express.Router()

// Endpoint público (no autenticado y no autorizado)
authRouter.get("/public", authPublic)

// Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", authAutenticado)

// Endpoint autorizado a administradores
authRouter.post("/autorizado", authAutorizado)


module.exports = authRouter;