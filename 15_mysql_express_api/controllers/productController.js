const path= require('path');
const dao = require('../services/dao');
const mime = require('mime');
const { verifyToken } = require('../utils/utils');

// Controlador para añadir imagenes del producto

const addProductImage = async (req, res) => {
    try {
        // Controlamos cuando el objeto files sea null
        if (req.files === null) return
        // Controlamos si nos viene algún tipo de archivo en el objeto files
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No se ha cargado ningún archivo")
        }
        // 1 archivo [{}] , >1 archivo [[{},{},...]]
        // Obtenemos un array de objetos con todas las imágenes
        const images = !req.files.imagen.length ? [req.files.imagen] : req.files.imagen
        // Recorremos el array para procesar cada imagen
        for (const image of images) {
        // Ya podemos acceder a las propiedades del objeto image.
        // Obtenemos la ruta de la imagen.
        let uploadPath = path.join(__dirname, "../public/product/" + image.name)
        // Usamos el método mv() para ubicar el archivo en nuestro servidor
        image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
        })
        await dao.addProductImage({ name: image.name, path: uploadPath })
        }
        return res.send("Imagen añadida")
        } catch (e) {
        console.log(e.message);
        return res.status(400).send(e.message)
        }
}

const addProduct = async (req, res) => {
    const { authorization } = req.headers
    // Si no existe el token enviamos un 401 (unauthorized)
    if (!authorization) return res.sendStatus(401)

    try{
    const payload = await verifyToken(authorization)
    // Verificamos que seamos usuariuo adminitrador
    if (!payload.role) return res.status(401).send('No tiene permiso de administrador')

    const {name, description, reference, stock, price} = req.body
    if (!name, !description, !reference, !stock, !price) return res.status(400).send('Error al recibir datos del body')
      
    if(!req.files || Object.keys(req, res).lenght === 0) 
    return res.send(`No se ha cargado ningún archivo`)

    const getProduct = await dao.getProductByReference(reference)
    console.log("longitud linea 54 " , getProduct)
    
    if (getProduct.length > 0) return res.status(400).send(`El producto ${name} ya existe`)

    const product_id = await dao.addProduct(req.body)
    console.log(product_id)
    const images = !req.files.imagen.length ? [req.files.imagen] : req.files.imagen
    for (const image of images) {
      
    let uploadPath = path.join(__dirname, "../public/product/" + image.name)
    // Usamos el método mv() para ubicar el archivo en nuestro servidor
    image.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    })
    await dao.addProductImage({ name: image.name, path: uploadPath, product_id })
    }
    return res.send(`Producto ${name} con id ${product_id} añadido correctamente`)
    } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message)
}
}

// Controlador para trear una imagen desde base de datos
const getProductImage = async (req, res) => {
    try {
        // Buscamos si el id de la imagen existe 
        const image = await dao.getImageById(req.params.id)
        // Si no existe nos lanza un error 404 (nor found)
        if (image.length === 0) return res.status(404).send('Imagen no encontrada')
        // Devolvemos la ruta donde se encuentra laimagen
        return res.send(image[0].path)
    }   catch (e) {
        console.log(e.message)
        return res.status(400).send(e.message)
    }
    
}

module.exports = { addProductImage, getProductImage, addProduct }