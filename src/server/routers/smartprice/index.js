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
import crmTradeinsPickupHubsRoute from './mws/api/crm/tradeins/pickup_hubs'
import crmPickupCreateAndSendBatchRoute from './mws/api/crm/pickup/create_and_send_batch'

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

import partnerApiTradeInIMEI from './mws/partner_api/tradein/imei'
import partnerApiTradeInPhoneCheck from './mws/partner_api/tradein/phone/check'
import partnerApiTradeInPhotoLink from './mws/partner_api/photo/link'
import partnerApiTradeInPhotoStatus from './mws/partner_api/photo/status'
import partnerApiTradeInPhotoUpload from './mws/partner_api/photo/upload'
import partnerApiTradeInDecline from './mws/partner_api/tradein/decline'

const formidable = require('express-formidable')

const jsonParser = bodyParser.json()

const smartpriceApi = express()

smartpriceApi.use(formidable())

// Special API imitation
smartpriceApi.get('/api/catalog', catalogCounterRoute)
smartpriceApi.post('/api/cdb', cartMutationRoute)
smartpriceApi.delete('/api/cdb', cartDeleteRoute)
smartpriceApi.post('/api/cart-order', cartOrderRoute)
smartpriceApi.post('/api/autocomplete/deliveryprice_for_cities/', deliverypriceForCitiesAutocompleteRoute)
smartpriceApi.post('/api/autocomplete/streets/', streetsAutocompleteRoute)
smartpriceApi.post('/api/check-discount/', checkDiscountPromoRoute)
smartpriceApi.post('/api/warranty_claim_email/', jsonParser, warrantyPageRoute)
smartpriceApi.get('/api/crm/tradeins/pickup_hubs/', jsonParser, crmTradeinsPickupHubsRoute)
smartpriceApi.post('/api/crm/pickup/create_and_send_batch/', jsonParser, crmPickupCreateAndSendBatchRoute)

// Frontend API imitation (не совсем понятно, почему Гена так называет часть запросов из клиента)
smartpriceApi.get('/fapi/get-catalog-data/', catalogDataRoute)

// Etc.
smartpriceApi.get('/md5/make/', jsonParser, md5Make)

// Online Trade-in API imitation
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

// Offline Trade-in API imitation
smartpriceApi.post('/partner_api/tradein/imei/', partnerApiTradeInIMEI)
smartpriceApi.post('/partner_api/tradein/phone/check/', partnerApiTradeInPhoneCheck)
smartpriceApi.post('/partner_api/photo/link/', partnerApiTradeInPhotoLink)
smartpriceApi.post('/partner_api/photo/status/', partnerApiTradeInPhotoStatus)
smartpriceApi.post('/partner_api/photo/upload/', partnerApiTradeInPhotoUpload)
smartpriceApi.post('/partner_api/tradein/decline/', partnerApiTradeInDecline)

export default smartpriceApi
