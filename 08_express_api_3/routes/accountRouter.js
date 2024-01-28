// importamos express
const express = require('express')
// Creamos un router
const accountRouter = express.Router()

// Importamos la base de datos
const {USERS_BBDD} = require('../bbdd')

// Middleware. Se ejecutará siempre antes del endpoint al que se llama
accountRouter.use((req, res, next) => {
    //Aquí le pasaremos la función que vamos a ejecutar
    console.log("Se ejecuta nuestra función definida en el middleware de account");
    // Continuamos con la siguiente función
    next();
    });

// Obtener los detalles de una cuenta
accountRouter.get('/:guid', (req, res) => {
    // Creamos una constanste desectructurada para agragar a guid lso parametros req.params y luego al usar guid ya los parametros incluidos
    const {guid} = req.params
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const user = USERS_BBDD.find(user => user.guid === guid)
    // Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send('La cuenta no existe')
    // si existe respondemos con los detalles de la cuenta
    return res.send(user) 
})

// Crear una cuenta nueva
accountRouter.post('/', (req, res) => {
    // Extraemos el guid y el nombre del body. Obligamos que estén los campos para crear el usuario
    const {guid, name} = req.body
    // Si no existe guid o name por el body devolvemos un 400 (bad request)
    if (!guid || !name) return res.status(400).send('Has dejado uno de los campos en blanco')
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const user = USERS_BBDD.find(user => user.guid === guid)
    // Si existe el usuario respondemos con un 409 (conflict)
    if (user) return res.status(409).send('La cuenta ya existe')
    //Creamos un objeto nuevo con los datos obtenidos con el metodo push
    USERS_BBDD.push({
        guid, name
    })
    return res.sendStatus(200)
})

// Actualizar una cuenta nueva
accountRouter.patch('/:guid', (req, res) => {
    // Extraemos el guid del params
    const {guid} = req.params
    // Extraemos el nombre del body
    const {name} = req.body
    // Si no existe name devolvemos un 400 (bad request)
    if (!name) return res.status(400)
    // Buscamos los detalles de la cuenta a traves del guid recibido por req.params
    const user = USERS_BBDD.find(user => user.guid === guid)
    // Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send('La cuenta no existe')
    // Añadimos el nombre modificado y enviamos la respuesta
    user.name = name;
    return res.send(user)

})

// Eliminar una cuenta
accountRouter.delete('/:guid', (req, res) => {
    const {guid} = req.params
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid)
    if (userIndex === -1) return res.status(404).send('La cuenta no existe')
    USERS_BBDD.splice(userIndex, 1)
    return res.sendStatus(200)
})

module.exports = accountRouter

