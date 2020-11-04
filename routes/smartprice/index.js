const express = require('express')

const smartpriceApi = express()
const catalogCounterRoute = require('./mws/api/catalog')

smartpriceApi.get('/api/catalog', catalogCounterRoute)

module.exports = smartpriceApi
