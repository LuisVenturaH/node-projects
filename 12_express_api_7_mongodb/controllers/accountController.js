const userModel = require('../services/schema/userSchema')

const listUser = async (req, res) => {
    // Creamos una constanste desectructurada para agragar a guid lso parametros req.params y luego al usar guid ya los parametros incluidos
    const {guid} = req.params

    const user = await userModel.findById(guid)

    if (!user) return res.status(404).send('El usuario no existe')
    res.send(user) 
}

const addUser = async (req, res) => {
   const {guid, name, email, password, role} = req.body
   // Si no existe guid o name por el body devolvemos un 400 (bad request)
   if (!guid || !name) return res.status(400).send('Has dejado uno de los campos en blanco')
   const user = await userModel.findById(guid)
    if(user) return res.sendStatus(409)
    
   // Buscamos los detalles de la cuenta a través del guid recibido por req.params
   const newUser = new userModel({_id: guid, name, email, password, role})
   await newUser.save()
   return res.status(201).send(newUser)
}

const updateUser = async (req, res) => {
    // Extraemos el guid del params
    const {guid} = req.params
    // Extraemos el nombre del body
    const {name, password, role, email} = req.body
    // Si no existe name devolvemos un 400 (bad request)
    if (!name) return res.status(400)
    // Buscamos los detalles de la cuenta a traves del guid recibido por req.params
    const user = await userModel.findById(guid)
    // Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send('La cuenta no existe')
    // Añadimos el nombre modificado y enviamos la respuesta
    user.name = name;
    await user.save()
}

const deleteUser = async (req, res) => {
    const {guid} = req.params
    const user = await userModel.findById(guid)
    if (user === -1) return res.status(404).send('La cuenta no existe')
    return res.sendStatus(200)
}


module.exports = {listUser, addUser, updateUser, deleteUser}