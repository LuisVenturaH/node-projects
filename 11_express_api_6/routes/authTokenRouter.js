const express = require('express')
const { authUser, listAuthUser } = require('../controllers/authTokenController')
const validateLoginDto = require('../dto/validateLoginDto')

const authTokenRouter = express.Router()

authTokenRouter.post("/login", validateLoginDto , authUser)
authTokenRouter.get("/profile", listAuthUser)

module.exports = authTokenRouter