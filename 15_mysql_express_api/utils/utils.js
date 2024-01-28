const { jwtVerify } = require('jose')

const removeUndefinedKeys = async (obj) => {
    try {
        // Iteramos sobre todas las claves del objeto
        Object.keys(obj).forEach((key) => {
        // Si el valor de la clave es undenifed o una cadena vacía, elimina la clave del objeto
        if (obj[key] === undefined || obj[key] === "") {
                delete obj[key]
            } 
        })
        return obj
    } catch (error) {
        throw new Error (error.message)
    }
}

const verifyToken = async (authorization) => {
try {
    const token = authorization.split(" ")[1]  
    // Codificamos la clave secreta
    const encoder = new TextEncoder()
    // Verificamos el token con la función jwtVerify. Le pasamos el token y la clave secreta codificada
    const { payload } = await jwtVerify(
    token,
    encoder.encode(process.env.JWT_SECRET)
   )

   return payload

    } catch(error) {
        throw new Error(error.message)
}

}


module.exports = { removeUndefinedKeys, verifyToken }