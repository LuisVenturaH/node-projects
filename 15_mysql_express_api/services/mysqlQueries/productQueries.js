const { removeUndefinedKeys } = require('../../utils/utils')
const db = require('../mysql')
const moment = require('moment')

const productQueries = {}

productQueries.addProductImage = async (ImageData) => {
    // Conectamos con la base de datos y añadimos los datos de la imagen
    let conn = null
    try {
        conn = await db.createConnection()
        // Creamos un objeto con los datos de la imagen a guardar en la base de datos
        // Usamos la libreria moment para registrar la fecha actual
        console.log(ImageData.product_id)
        let imageObj = {
            name: ImageData.name,
            path: ImageData.path,
            product_id: ImageData.product_id, // Esto se lo he agregado para comprobar si llega el product:id después de creada la funcion
            register_date: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        return await db.query('INSERT INTO images SET ?', imageObj, 'insert', conn) // He agredado product_id al final
    } catch (e) {
        throw new Error(e)
    } finally {
        conn && (await conn.end)
    }
}

productQueries.addProduct = async (data) => {
    let conn = null
    try {
        conn = await db.createConnection()
        let productObj = {
            name: data.name,
            description: data.description,
            reference: data.reference,
            stock: data.stock,
            price: data.price,
            register_date: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        productObj = await removeUndefinedKeys(productObj)
        return await db.query('INSERT INTO products SET ?', productObj, 'insert', conn)
    } catch(e) {
        throw new Error (e)
    } finally {
        conn && (await conn.end)
    }
    
}

productQueries.getProductByReference = async (reference) => {
    let conn = null
    try{
        conn = await db.createConnection()
        return await db.query(
            'SELECT * from products WHERE reference = ?', reference, 'select', conn)
    } catch (e) {
        throw new Error(e)
    } finally {
        conn && (await conn.end)
    }
}

productQueries.getImageById = async (id) => {
    let conn = null
    try{
        conn = await db.createConnection()
        return await db.query(
            'SELECT * from images WHERE id = ?', id, 'select', conn)
    } catch (e) {
        throw new Error(e)
    } finally {
        conn && (await conn.end)
    }
}

module.exports = productQueries