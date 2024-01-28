const express = require('express')
const { addProductImage, getProductImage, addProduct } = require('../controllers/productController')

const productRouter = express.Router()

// Subir imagenes al servidor y base de datos
productRouter.post('/image', addProductImage)

// Ruta para obtener una imagen por su id
productRouter.get('/image/:id', getProductImage)

// Ruta para añadir productos
productRouter.post('/add', addProduct)




module.exports = productRouter