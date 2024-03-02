const express = require("express")
const Router = express.Router()
const pageController = require("../controllers/page")

Router.get("/:id", pageController.page_detail)

Router.post("/", pageController.page_create)

Router.put("/:id", pageController.page_update)

Router.delete("/:id", pageController.page_delete)

module.exports = Router
