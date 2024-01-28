const {USERS_BBDD} = require('../bbdd')

const listUser = (req, res) => {
    // Creamos una constanste desectructurada para agregar a guid los parametros req.params
    const {guid} = req.params
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const user = USERS_BBDD.find(user => user.guid === guid)
    // Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send('La cuenta no existe')
    // si existe respondemos con los detalles de la cuenta
    res.send(user) 
}

const addUser = (req, res) => {
   // Extraemos el guid y el nombre del body. Obligamos que estén los campos para crear el usuario
   const {guid, name} = req.body
   // Si no existe guid o name por el body devolvemos un 400 (bad request)
   if (!guid || !name) return res.status(400).send('Error en el body')
   // Buscamos los detalles de la cuenta a través del guid recibido por req.params
   const user = USERS_BBDD.find(user => user.guid === guid)
   // Si existe el usuario respondemos con un 409 (conflict)
   if (user) return res.status(409).send('La cuenta ya existe')
   //Creamos un objeto nuevo con los datos obtenidos con el metodo push
   USERS_BBDD.push({
       guid, name
   })
   res.send('Cuenta creada')
}

const updateUser = (req, res) => {
    // Extraemos el guid del req.params
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
    res.send(user)
}

const deleteUser = (req, res) => {
    // Buscamos los detalles de  la cuenta a través del guid sacado por req.params
    const {guid} = req.params
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid)
    // Si no encuentra guid retorna respondemos con un 404 (not found) y nos devuelve un -1
    if (userIndex === -1) return res.status(404).send('La cuenta no existe')
    // Eliminanos el indice de ese usuario del array
    USERS_BBDD.splice(userIndex, 1)
    // Enviamos la respuesta
    res.send('Cuenta eliminada')
}


module.exports = {listUser, addUser, updateUser, deleteUser}