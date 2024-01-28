const dao = require("../services/dao")
const { verifyToken } = require("../utils/utils")


const addOrder = async (req, res) => {
    const { authorization } = req.headers
    // Si no existe el token enviamos un 401 (unauthorized)
    if (!authorization) return res.sendStatus(401)

    try{
    const payload = await verifyToken(authorization)

    const {product_id, quantity} = req.body
    if (!product_id, !quantity) return res.status(400).send('Error al recibir datos del body')
    
    const orderData = {
        product_id,
        quantity,
        id_user: payload.id
    }

    const newOrder = await dao.addOrder(orderData)
    if (!newOrder) return res.sendStatus(500)
    return res.send(`Pedido con id ${newOrder} creado correctamente`)

    } catch(e){
        console.log(e.message)
        return res.sendStatus(500)
    }

}

const getAllOrders = async (req, res) => {
    const { authorization } = req.headers
        // Si no existe el token enviamos un 401 (unauthorized)
        if (!authorization) return res.sendStatus(401)
        try {
            const payload = await verifyToken(authorization)
            if (!payload.role) return res.status(401).send('No autorizado')
            
            const orders = await dao.getAllOrders()
            if (orders.lenght === 0) return res.status(404).send('No hay pedidos')
            return res.send(orders)
        } catch (e) {
            console.error(e.message);
            return res.status(500).send("Error interno del servidor");
        } finally {
            conn && (await conn.end)
        }

}

module.exports = { addOrder, getAllOrders }