const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const urlMetadataRouter = require('./routes/url-metadata')
const reCAPTCHAV3Router = require('./routes/recaptcha-v3')
const swaggerRouter = require('./routes/swagger')
const smartpriceRouter = require('./routes/smartprice')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/url-metadata', urlMetadataRouter)
app.use('/recaptcha-v3', reCAPTCHAV3Router)
app.use('/swagger', swaggerRouter)
app.use('/smartprice', smartpriceRouter)

module.exports = app
