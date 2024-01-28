// Endpoint para crear login

//Importamos Express y la función para validar email y password
const express = require('express')
const { v4: uuid4 } = require('uuid')
const checkEmailPassword = require("../utils/checkEmailPassword")
const { USERS_BBDD } = require('../bbdd')

const authSessionRouter = express.Router()

const sessions = []

authSessionRouter.post("/login", async (req, res) => {
    // Obtenemos el email y el password del body
    const { email, password } = req.body
    // Si no existe alguno de esos dos campos devolvemos 400 (bad request)
    if (!email || !password) return res.sendStatus(400)

    try {
        // Llamamos a la función de validar email y password
        const { guid } = await checkEmailPassword(email, password)
        // Generamos un identificador con la libreria uuid
        const sessionId = uuid4()
        // Añadimos el sesionId y el guid el usuario al array
        sessions.push({sessionId, guid})
        // Escribimos en la cookie el sessionId con la opción httpOnly
        res.cookie('sessionId', sessionId, {httpOnly: true})
        // si todo es correcto enviamos la respuesta 200.
        console.log(sessions);
        return res.send();
    }  catch (err) {
        // Si el usuario no existe enviamos un 401 (unauthorized)
        return res.sendStatus(401)
    }
})

// Solicitud autenticada con sesión para obtener el perfil del usuario
authSessionRouter.get("/profile", (req, res) => {
    // Obtenemos la cookie que recibimos
    const { cookies } = req
    // Si la cookie no existe enviamos un 401 (unauthorized)
    console.log(cookies)
    if (!cookies.sessionId) return res.sendStatus(401)
    // Buscamos al sesión recibida en el array de sesiones
    const userSession = sessions.find((session) => session.sessionId === cookies.sessionId)
    // Si no existe enviamos un 401 (unauthorized)
    if (!userSession) return res.sendStatus(401)
    // Obtenemos los datos del usuario a traves del guid
    const user = USERS_BBDD.find(user => user.guid === userSession.guid)
    // Si no obtenemos usuario enviamos un 401 (unauthorized)
    if (!user) return res.sendStatus(401)
    // Borramos la password del objeto obtenido para no mostrarla
    delete user.password
    // Y devolvemos los datos del usuario
    return res.send(user)
})





module.exports = authSessionRouter