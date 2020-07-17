"use strict"

//config
const { PORT } = require("./utils/config")

//libraries
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")

// utils imports
const { info } = require("./utils/logger")
const { errorHandler,
    unknownEndpoint,
    requestLogger } = require('./utils/middleware')

// database conection
require("./database/database")

//controllers imports
const userRouter = require("./controllers/users")

// middleware
app.use(cors())
app.use(express.json())
app.use(requestLogger)

//controllers
app.use("/api/users/", userRouter)


//error handlers
app.use(unknownEndpoint)
app.use(errorHandler)

//server listening
app.listen(PORT, () => {
    info(`Server Listening on ${PORT}`)
})
