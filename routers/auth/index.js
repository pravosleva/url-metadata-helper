const express = require('express')
const path = require('path')

const authApi = express()
const loginRoute = require('./mws/login')
const redirectIfLoggedMw = require('./mws/redirect-if-logged')
const { accessCode } = require('./cfg')
const getAccessCodeByHash = require('./mws/get-access-code-by-hash')
// const checkAuth = require('./mws/check-jwt')

const { SP_SVYAZNOY_JWT_SECRET } = process.env

authApi.post('/login', loginRoute)
// authApi.get('/signin', redirectIfLoggedMw(SP_SVYAZNOY_JWT_SECRET, accessCode.OTSvyaznoyV1))
authApi.use(
  '/signin',
  redirectIfLoggedMw(SP_SVYAZNOY_JWT_SECRET, accessCode.OTSvyaznoyV1),
  express.static(path.join(__dirname, './pages/signin/build'))
)
authApi.get('/get-access-code-by-hash', getAccessCodeByHash)

module.exports = authApi
