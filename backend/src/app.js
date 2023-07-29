const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const dbConfig = require("./config/db.config")

require("dotenv").config();

const dbConn = require('./config/db.config')

//database conn
dbConn()

// initialising express app
const app = express()

// allowing cookies 
app.use(cookieParser())

//allowing json and form-data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use(cors())

//database connection
dbConfig()

// user routes
app.use("/usr", require("./routes/user.routes"))

//exportng app
module.exports = app