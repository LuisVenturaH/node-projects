const { removeUndefinedKeys } = require('../../utils/utils')
const db = require('../mysql')
const moment = require('moment')

const orderQueries = {}

orderQueries.addOrder = async (orderData) => {
    let conn = null
    try {
        conn = await db.createConnection()
        let orderObj = {
            product_id: orderData.product_id,
            quantity: orderData.quantity,
            id_user: orderData.id_user,
            order_date: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        orderObj = await removeUndefinedKeys(orderObj)
        return await db.query('INSERT INTO orders SET ?', orderObj, 'insert', conn)
    } catch(e) {
        throw new Error (e)
    } finally {
        conn && (await conn.end)
    }
}

orderQueries.getAllOrders = async () => {
    let conn = null
    try{
        conn = await db.createConnection()
        return await db.query(
            'SELECT * from orders', null, 'select', conn)
    } catch (e) {
        throw new Error(e)
    } finally {
        conn && (await conn.end)
    }
}

module.exports = orderQueries