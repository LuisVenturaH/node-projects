const { SignJWT } = require('jose')
const dao = require('../services/dao')
const md5 = require('md5');
const { verifyToken } = require('../utils/utils');

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    // Si no existe alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
    if (!name || !email || !password) return res.status(400).send("Error al recibir el body");
    // Buscamos el usuario en la base de datos
    try {
        const user = await dao.getUserByEmail(email)
        // Si existe el usuario respondemos con un 409 (conflict)
        if (user.length > 0) return res.status(409).send("usuario ya registrado");
        // Si no existe lo registramos
        const addUser = await dao.addUser(req.body)
        if (addUser) return res.send(`Usuario ${name} con id: ${addUser} registrado`)
        res.status(200).send('Usuario creado')
    } catch (e) {
        console.log(e.message)
	  throw new Error(e)	
    }
}

// Controlador para el login de un usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Si no encuentra alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
    if (!email || !password)
      return res.status(400).send("Error al recibir el body");
  
    try {
      let user = await dao.getUserByEmail(email);
      // Si no existe el usuario respondemos con un 404 (not found)
      if (user.length <= 0) return res.status(404).send("usuario no registrado");
      // Pasamos md5 a la paswword recibida del cliente
      const clienPassword = md5(password);
      // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
      [user] = user;
      // Si existe el usuario, comprobamos que la password es correcta. Si no lo es devolvemos un 401 (unathorized)
      if (user.password != clienPassword)
        return res.status(401).send("password incorrecta");
        // Si es correcta generamos el token y lo devolvemos al cliente
        // Construimos el JWT con el id, email y rol del usuario
        const jwtConstructor = new SignJWT({ id: user.id, email, role: user.user_role });

        // Codificamos la clave secreta definida en la variable de entorno por requisito de la librería jose
        // y la pasamos en el formato correcto (uint8Array) en el método .sign
        const encoder = new TextEncoder();
        // Generamos el JWT. Lo hacemos asíncrono, ya que nos devuelve una promesa.
        // Le indicamos la cabecera, la creación, la expiración y la firma (clave secreta).
        const jwt = await jwtConstructor
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(encoder.encode(process.env.JWT_SECRET));
        //Si todo es correcto enviamos la respuesta. 200 OK
        return res.send({ jwt });
    } catch (e) {
        console.log(e.message);
  }
};

// Controlador para eliminar usuarios
const deleteUser = async (req, res) => {
   // Obtener cabecera para comprobar su autenticidad y caducidad
   const { authorization } = req.headers
   // Si no existe el token enviamos un 401 (unauthorized)
   if (!authorization) return res.sendStatus(401)
  
  try {
    const payload = await verifyToken(authorization)
    // Verificamos que seamos usuariuo adminitrador
    if (!payload.role) return res.status(409).send('No tiene paermiso de adminitrador')
    // Buscamos la existencia del ID en la base de datos
    const user = await dao.getUserById(req.params.id)
    // Si no existe devolvemos un 404 (not found)
    if (user.length <= 0) return res.status(404).send('El usuario no existe')
    // si existe eliminamos el usuario por Id
    await dao.deleteUser(req.params.id)
    // Devolvemos la respuesta 
    return res.send(`Usuario ${req.params.id} eliminado correctamente`) 
  } catch (e) {
    console.log(e.message)
  }
}

// Controlador para actualizar usuarios
const updateUser = async (req, res) => {
  const { authorization } = req.headers
  // Si no existe el token envianmos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401)
  // Sino nos nos viene nada desde el bodyenviamos un(bad quest)
  if (Object.keys(req.body).length === 0)return res.status(400).send('Error al recibir desdeel body') 

  try {
    const payload = await verifyToken(authorization)
    const userId = parseInt(req.params.id)
    console.log(userId)
    // Si no nos llega un campo por el body devolvemos un 400 (Bad request)
    if(payload.id !==userId) return res.status(401).send('No autorizado')

    const updateUser = await dao.updateUser(userId, req.body)
    if(updateUser) {
      return res.send(`Usuaro con id ${userId} actualizado`)
    } else{
      return res.sendStatus(500)
    }
  } catch(e) {
      console.log(e.message)
  }
}

const getUsers = async (req, res) => {
  const { authorization } = req.headers
  // Si no existe el token envianmos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401)

  try {
    const payload = await verifyToken(authorization)
    if(!payload.role) return res.status(401).send('No autorizado')
     const users = await dao.getUsers()
    return res.send(users)

  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Error interno del servidor");
  }
}



module.exports = { addUser, loginUser, deleteUser, updateUser, getUsers }