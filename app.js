const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

const mainRouter = require('./routers/index')
const usersRouter = require('./routers/users')
const urlMetadataRouter = require('./routers/url-metadata')
const reCAPTCHAV3Router = require('./routers/recaptcha-v3')
const swaggerRouter = require('./routers/swagger')
const smartpriceRouter = require('./routers/smartprice')
const imeiRouter = require('./routers/imei')
const authRouter = require('./routers/auth')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', mainRouter)
app.use('/users', usersRouter)
app.use('/url-metadata', urlMetadataRouter)
app.use('/recaptcha-v3', reCAPTCHAV3Router)
app.use('/swagger', swaggerRouter)
app.use('/smartprice', smartpriceRouter)
app.use('/imei', imeiRouter)
app.use('/auth', authRouter)

module.exports = app
