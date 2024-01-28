const express = require('express')


const authSessionRouter = express.Router()

const { authUser, listUser } = require('../controllers/authSessionController')

authSessionRouter.post("/login", authUser)

authSessionRouter.get("/profile", listUser)

module.exports = authSessionRouter