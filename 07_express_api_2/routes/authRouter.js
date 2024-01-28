// Importamos express
const express = require("express");
// importamos el archivo bbdd.js

const { USERS_BBDD } = require("../bbdd.js");

const authRouter = express.Router();
// Endpoint público (no autenticado y no autorizado)
// Endpoint autenticado para todo usuario registrado
// Endpoint autorizado a administradores



module.exports = authRouter;