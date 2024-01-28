// importamos el modulo express
const express = require('express')
// impoirtamos el modulo dotenv
const dotenv = require('dotenv')
dotenv.config()

// Definimos el puerto
const port = process.env.PORT
const app = express()


// Importamos la base de datos
const {USERS_BBDD} = require('./bbdd')

// Middleware para interpretar el formato json y text enviados desde el cliente por HTTP
app.use(express.json())
app.use(express.text())


// Obtener los detalles de una cuenta
app.get('/account/:guid', (req, res) => {
    // Creamos una constanste desectructurada para agragar a guid lso parametros req.params y luego al usar guid ya los parametros incluidos
    const {guid} = req.params
    // Buscamos lso detalles de la cuenta a través del guid recibido por req.params
    const user = USERS_BBDD.find(user => user.guid === guid)
    // Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send('La cuenta no existe')
    // si existe respondemos con los detalles de la cuenta
    return res.send(user) 
})

// Crear una cuenta nueva
app.post('/account/:guid', (req, res) => {
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
app.patch('/account/:guid', (req, res) => {
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
app.delete('/account/:guid', (req, res) => {
    const {guid} = req.params
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid)
    if (userIndex === -1) return res.status(404).send('La cuenta no existe')
    USERS_BBDD.splice(userIndex, 1)
    return res.sendStatus(200)
})

// Levantamos el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Server is up and running in port ${port}!!!`)
})




