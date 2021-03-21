const express = require('express')
const path = require('path')

const authApi = express()
const loginRoute = require('./mws/login')
const redirectIfLoggedMw = require('./mws/redirect-if-logged')
const { accessCode } = require('./cfg')
const getAccessCodeByHash = require('./mws/get-access-code-by-hash')
// const checkAuth = require('./mws/check-jwt')

const { SP_SVYAZNOY_JWT_SECRET, EXPIRES_COOKIES_IN_DAYS, SP_ACCESS_PASSWORD } = process.env
if (!SP_SVYAZNOY_JWT_SECRET || !SP_ACCESS_PASSWORD) {
  throw new Error('!SP_SVYAZNOY_JWT_SECRET || !SP_ACCESS_EMAIL || !SP_ACCESS_PASSWORD')
}

let expiresCookiesTimeInDays
try {
  // eslint-disable-next-line radix
  expiresCookiesTimeInDays = parseInt(EXPIRES_COOKIES_IN_DAYS)
} catch (err) {
  expiresCookiesTimeInDays = 1
}

authApi.post('/login', loginRoute(expiresCookiesTimeInDays))
// authApi.get('/signin', redirectIfLoggedMw(SP_SVYAZNOY_JWT_SECRET, accessCode.OTSvyaznoyV1))
authApi.use(
  '/signin',
  redirectIfLoggedMw(SP_SVYAZNOY_JWT_SECRET, accessCode.OTSvyaznoyV1),
  // TODO: Other middlewares...
  express.static(path.join(__dirname, './pages/signin/build'))
)
authApi.get('/get-access-code-by-hash', getAccessCodeByHash)

module.exports = authApi
