require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// connect to db
const MONGODB = process.env.MONGODB_URI
const main = async () => mongoose.connect(MONGODB)
main().catch(() => console.log("error connecting to db"))

// use routers
const pageRouter = require("./routes/page")
const userRouter = require("./routes/user")
app.use("/api/page", pageRouter)
app.use("/api/user", userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))
