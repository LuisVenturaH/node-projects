const express = require('express')
const { SignJWT, jwtVerify} = require('jose') 
const checkEmailPassword = require('../utils/checkEmailPassword')
const validateLoginDto = require('../dto/validateLoginDto')
const { USERS_BBDD } = require('../bbdd')
const authTokenRouter = express.Router()

authTokenRouter.post("/login", validateLoginDto, async (req, res) => {
    // Obtenemos el email y password del body
    const { email, password } = req.body
    // Si no existen email o password lanzamos un error 400 (bad request)
    if(!email || !password) return res.sendStatus(400)

    try{
        // Validamos el email y el password y obtenemos el guid
        const { guid } = await checkEmailPassword(email, password)
        
        // GENERAR TOKEN Y DEVOLVER TOKEN
        // Construimos el JWT con el guid
        const jwtConstructor = new SignJWT({ guid })

        // Codificamos la clave secreta definida en la variable de entorno por requisito de la librería jose
        // y poder pasarla en el formato correcto (uint8Array) en el método .sign
        const encoder = new TextEncoder();

        // Generamos el JWT. Lo hacemos asíncrono, ya que nos devuelve una promesa.
        // Le indicamos la cabecera, la creación, la expiración y la firma (clave secreta).
        const jwt = await jwtConstructor
        .setProtectedHeader({alg: 'HS256', typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encoder.encode(process.env.JWT_SECRET))

        console.log(jwt)
        // Si todo es correcto enviamos una respuesta 200. Ok
        return res.send({ jwt })
    } catch (err){
        // Si el usuario no existe enviamos un 401 (unauthorized)
        return res.sendStatus(401)
    }
})

authTokenRouter.get("/profile", async (req, res) => {
    // Obtener la cabecera y comprobar la autenticidad y caducidad
    const { authorization } = req.headers
    // Si no existe el token enviamos un 401 (unauthorized)
    if (!authorization) return res.sendStatus(401)
    try {
        const token = authorization.split(" ")[1]
        // Codificamos la clave secreta
        const encoder = new TextEncoder()
        // verificamos el token con la función jwtVerify. Le pasamos el token y la clave secreta codificada
        const { payload } = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET))
            // Obtenemos los datos del usuario a través de guid
            const user = USERS_BBDD.find(user => user.guid === payload.guid)
            // Si no obtenemos usuario enviamos un 401 (unauthorized)
            if (!user) return res.sendStatus(401)
            // Borramos la password del objeto obtenido para no mostrarla
            delete user.password
            // Y devolvemos los datos del usuario
            return res.send(user)
    } catch (err) {
        // Si hay un error el token enviamos un 401 (unauthorized)
        return res.sendStatus(401)
    }
})


module.exports = authTokenRouter