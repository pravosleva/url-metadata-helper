const express = require('express')

const authApi = express()
const loginRoute = require('./mws/login')

authApi.post('/login', loginRoute)

module.exports = authApi
