const express = require('express')
// Create application/json parser
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const smartpriceApi = express()
const catalogCounterRoute = require('./mws/api/catalog')
const cartMutationRoute = require('./mws/api/cdb-post')
const cartDeleteRoute = require('./mws/api/cdb-delete')
const cartOrderRoute = require('./mws/api/cart-order')
const deliverypriceForCitiesAutocompleteRoute = require('./mws/api/autocomplete/deliveryprice_for_cities')
const streetsAutocompleteRoute = require('./mws/api/autocomplete/streets')
const checkDiscountPromoRoute = require('./mws/api/check-discount')
const warrantyPageRoute = require('./mws/api/warranty_claim_email')

const md5Make = require('./mws/md5/make')

const catalogDataRoute = require('./mws/fapi/get-catalog-data')

const otApiV1SvyaznoyGetIMEI = require('./mws/otapi/v1/svyaznoi/imei')
const otApiV1SvyaznoyConfirmDetection = require('./mws/otapi/v1/svyaznoi/confirm_detection')
const otApiV1SvyaznoyDiagnostics = require('./mws/otapi/v1/svyaznoi/diagnostics')
const otApiV1SvyaznoyAcceptPreprice = require('./mws/otapi/v1/svyaznoi/accept_preprice')
const otApiV1SvyaznoyDeclinePreprice = require('./mws/otapi/v1/svyaznoi/decline_price')
const otApiV1SvyaznoyPhotoUpload = require('./mws/otapi/v1/svyaznoi/photo_upload')
const otApiV1SvyaznoyCheckState = require('./mws/otapi/v1/svyaznoi/check_state')
const otApiV1SvyaznoyAcceptPrice = require('./mws/otapi/v1/svyaznoi/accept_price')
const otApiV1SvyaznoyBuyoutDocForm = require('./mws/otapi/v1/svyaznoi/buyout_doc_form')
const otApiV1SvyaznoySignBuyoutDoc = require('./mws/otapi/v1/svyaznoi/sign_buyout_doc')
const otApiV1SvyaznoySwagger = require('./mws/otapi/v1/svyaznoi/swagger')
const checkAuth = require('../auth/mws/check-jwt')

const { SP_JWT_SECRET } = process.env

// Special API imitation
smartpriceApi.get('/api/catalog', catalogCounterRoute)
smartpriceApi.post('/api/cdb', cartMutationRoute)
smartpriceApi.delete('/api/cdb', cartDeleteRoute)
smartpriceApi.post('/api/cart-order', cartOrderRoute)
smartpriceApi.post('/api/autocomplete/deliveryprice_for_cities/', deliverypriceForCitiesAutocompleteRoute)
smartpriceApi.post('/api/autocomplete/streets/', streetsAutocompleteRoute)
smartpriceApi.post('/api/check-discount/', checkDiscountPromoRoute)
smartpriceApi.post('/api/warranty_claim_email/', jsonParser, warrantyPageRoute)

// Frontend API imitation (не совсем понятно, почему Гена так называет часть запросов из клиента)
smartpriceApi.get('/fapi/get-catalog-data/', catalogDataRoute)

// Etc.
smartpriceApi.get('/md5/make/', jsonParser, md5Make)

// Online TradeIn API imitation
smartpriceApi.use('/otapi/v1/svyaznoy/swagger/', checkAuth(SP_JWT_SECRET, 'spToolJwt'), otApiV1SvyaznoySwagger)
smartpriceApi.post('/otapi/v1/svyaznoy/imei/', otApiV1SvyaznoyGetIMEI)
smartpriceApi.post('/otapi/v1/svyaznoy/confirm_detection/', otApiV1SvyaznoyConfirmDetection)
smartpriceApi.post('/otapi/v1/svyaznoy/diagnostics/', otApiV1SvyaznoyDiagnostics)
smartpriceApi.post('/otapi/v1/svyaznoy/accept_preprice/', otApiV1SvyaznoyAcceptPreprice)
smartpriceApi.post('/otapi/v1/svyaznoy/decline_price/', otApiV1SvyaznoyDeclinePreprice)
smartpriceApi.post('/otapi/v1/svyaznoy/photo_upload/', otApiV1SvyaznoyPhotoUpload)
smartpriceApi.post('/otapi/v1/svyaznoy/check_state/', otApiV1SvyaznoyCheckState)
smartpriceApi.post('/otapi/v1/svyaznoy/accept_price/', otApiV1SvyaznoyAcceptPrice)
smartpriceApi.post('/otapi/v1/svyaznoy/buyout_doc_form/', otApiV1SvyaznoyBuyoutDocForm)
smartpriceApi.post('/otapi/v1/svyaznoy/sign_buyout_doc/', otApiV1SvyaznoySignBuyoutDoc)

module.exports = smartpriceApi
