const express = require("express")
const Router = express.Router()
const pageController = require("../controllers/page")
const userController = require("../controllers/user")

Router.get("/:id", pageController.page_detail)

Router.post("/", userController.user_is_auth, pageController.page_create)

Router.put("/:id", userController.user_is_same, pageController.page_update)

Router.delete("/:id", userController.user_is_same, pageController.page_delete)

module.exports = Router
