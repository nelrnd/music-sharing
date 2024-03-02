const express = require("express")
const Router = express.Router()
const userController = require("../controllers/user")

Router.post("/register", userController.user_register, userController.user_login)

Router.post("/login", userController.user_login)

Router.get("/:id/pages", userController.user_get_pages)

Router.put("/:id", userController.user_update)

Router.delete("/:id", userController.user_delete)

module.exports = Router
