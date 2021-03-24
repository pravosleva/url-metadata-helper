// NOTE: envs already got from ./server-dist/.env

import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import authRouter from './routers/auth'

import { accessCode, redirect } from './routers/auth/cfg'
import redirectIfUnloggedMw from './routers/auth/mws/redirect-if-unlogged'
import mainRouter from './routers/index'
import usersRouter from './routers/users'
import urlMetadataRouter from './routers/url-metadata'
import reCAPTCHAV3Router from './routers/recaptcha-v3'
import swaggerRouter from './routers/swagger'
import smartpriceRouter from './routers/smartprice'
import imeiRouter from './routers/imei'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// NOTE: Пути до "публичной" статики (та что в ./public/*) указываем относительно ./server-dist
// (transpiling destination dir, откуда будет запуск)
app.get(
  '/',
  redirectIfUnloggedMw(redirect[accessCode.Homepage].jwtSecret, accessCode.Homepage),
  express.static(path.join(__dirname, '../', 'public')),
  mainRouter
)
app.use(express.static(path.join(__dirname, '../', 'public')))

app.use('/users', usersRouter)
app.use('/url-metadata', urlMetadataRouter)
app.use('/recaptcha-v3', reCAPTCHAV3Router)
app.use('/swagger', swaggerRouter)
app.use('/smartprice', smartpriceRouter)
app.use('/imei', imeiRouter)
app.use('/auth', authRouter)

module.exports = app
