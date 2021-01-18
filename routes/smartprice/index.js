const express = require('express')

// Create application/json parser
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

// API:
const smartpriceApi = express()
const catalogCounterRoute = require('./mws/api/catalog')
const cartMutationRoute = require('./mws/api/cdb-post')
const cartDeleteRoute = require('./mws/api/cdb-delete')
const cartOrderRoute = require('./mws/api/cart-order')
const deliverypriceForCitiesAutocompleteRoute = require('./mws/api/autocomplete/deliveryprice_for_cities')
const streetsAutocompleteRoute = require('./mws/api/autocomplete/streets')
const checkDiscountPromoRoute = require('./mws/api/check-discount')
const warrantyPageRoute = require('./mws/api/warranty_claim_email')

// FAPI:
const catalogDataRoute = require('./mws/fapi/get-catalog-data')

smartpriceApi.get('/api/catalog', catalogCounterRoute)
smartpriceApi.post('/api/cdb', cartMutationRoute)
smartpriceApi.delete('/api/cdb', cartDeleteRoute)
smartpriceApi.post('/api/cart-order', cartOrderRoute)
smartpriceApi.post('/api/autocomplete/deliveryprice_for_cities/', deliverypriceForCitiesAutocompleteRoute)
smartpriceApi.post('/api/autocomplete/streets/', streetsAutocompleteRoute)
smartpriceApi.post('/api/check-discount/', checkDiscountPromoRoute)
smartpriceApi.post('/api/warranty_claim_email/', jsonParser, warrantyPageRoute)

smartpriceApi.post('/fapi/get-catalog-data/', catalogDataRoute)

module.exports = smartpriceApi
