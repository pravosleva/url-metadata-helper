/* eslint-disable import/extensions */
import express from 'express'
// Create application/json parser
import bodyParser from 'body-parser'
import catalogCounterRoute from './mws/api/catalog'
import cartMutationRoute from './mws/api/cdb-post'
import cartDeleteRoute from './mws/api/cdb-delete'
import cartOrderRoute from './mws/api/cart-order'
import deliverypriceForCitiesAutocompleteRoute from './mws/api/autocomplete/deliveryprice_for_cities'
import streetsAutocompleteRoute from './mws/api/autocomplete/streets'
import checkDiscountPromoRoute from './mws/api/check-discount'
import warrantyPageRoute from './mws/api/warranty_claim_email'

import md5Make from './mws/md5/make'

import catalogDataRoute from './mws/fapi/get-catalog-data'

import otApiV1SvyaznoyGetIMEI from './mws/otapi/v1/svyaznoi/imei'
import otApiV1SvyaznoyConfirmDetection from './mws/otapi/v1/svyaznoi/confirm_detection'
import otApiV1SvyaznoyDiagnostics from './mws/otapi/v1/svyaznoi/diagnostics'
import otApiV1SvyaznoyAcceptPreprice from './mws/otapi/v1/svyaznoi/accept_preprice'
import otApiV1SvyaznoyDeclinePreprice from './mws/otapi/v1/svyaznoi/decline_price'
import otApiV1SvyaznoyPhotoUpload from './mws/otapi/v1/svyaznoi/photo_upload'
import otApiV1SvyaznoyCheckState from './mws/otapi/v1/svyaznoi/check_state'
import otApiV1SvyaznoyAcceptPrice from './mws/otapi/v1/svyaznoi/accept_price'
import otApiV1SvyaznoyBuyoutDocForm from './mws/otapi/v1/svyaznoi/buyout_doc_form'
import otApiV1SvyaznoySignBuyoutDoc from './mws/otapi/v1/svyaznoi/sign_buyout_doc'
import otApiV1SvyaznoySwagger from './mws/otapi/v1/svyaznoi/swagger'
// import checkAuth from '../auth/mws/check-jwt'
import { EAccessCode, redirect } from '../auth/cfg'
import redirectIfUnloggedMw from '../auth/mws/redirect-if-unlogged'

const jsonParser = bodyParser.json()

const smartpriceApi = express()

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
smartpriceApi.use(
  '/otapi/v1/svyaznoy/swagger/',
  redirectIfUnloggedMw(redirect[EAccessCode.OTSvyaznoyV1].jwtSecret, EAccessCode.OTSvyaznoyV1),
  otApiV1SvyaznoySwagger
)
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

export default smartpriceApi
