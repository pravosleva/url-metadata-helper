const express = require('express')
const path = require('path')

const authApi = express()
const loginRoute = require('./mws/login')
const redirectIfLoggedMw = require('./mws/redirect-if-logged')
const { maping } = require('./cfg')

const { SP_JWT_SECRET } = process.env

authApi.post('/login', loginRoute)
authApi.get('/signin', redirectIfLoggedMw(SP_JWT_SECRET, maping.OTSvyaznoyV1))
authApi.use(
  '/signin',
  redirectIfLoggedMw(SP_JWT_SECRET, maping.OTSvyaznoyV1),
  express.static(path.join(__dirname, './pages/signin/build'))
)

module.exports = authApi
