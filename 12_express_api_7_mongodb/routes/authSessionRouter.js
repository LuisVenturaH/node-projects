const express = require("express");
const { authUser, listUser} = require("../controllers/authSessionController");

const authSessionRouter = express.Router();

// auth-session router
authSessionRouter.post("/login", authUser);
authSessionRouter.get("/profile", listUser);

module.exports = authSessionRouter;