const express = require('express')
const { addOrder, getAllOrders } = require('../controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/', addOrder)
orderRouter.get('/', getAllOrders)

module.exports = orderRouter

