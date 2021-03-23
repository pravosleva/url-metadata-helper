const express = require('express')
const path = require('path')

const authApi = express()
const loginRoute = require('./mws/login')
const redirectIfLoggedMw = require('./mws/redirect-if-logged')
const { accessCode, redirect } = require('./cfg')
const getAccessCodeByHash = require('./mws/get-access-code-by-hash')
// const checkAuth = require('./mws/check-jwt')

const { EXPIRES_COOKIES_IN_DAYS } = process.env

let expiresCookiesTimeInDays
try {
  // eslint-disable-next-line radix
  expiresCookiesTimeInDays = parseInt(EXPIRES_COOKIES_IN_DAYS)
} catch (err) {
  expiresCookiesTimeInDays = 1
}

authApi.post('/login', loginRoute(expiresCookiesTimeInDays))
authApi.use(
  '/signin',
  redirectIfLoggedMw(redirect[accessCode.OTSvyaznoyV1].jwtSecret, accessCode.OTSvyaznoyV1),
  redirectIfLoggedMw(redirect[accessCode.Homepage].jwtSecret, accessCode.Homepage),
  // TODO: Other middlewares...
  express.static(path.join(__dirname, './pages/signin/build'))
)
authApi.get('/get-access-code-by-hash', getAccessCodeByHash)

module.exports = authApi
