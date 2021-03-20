const md5Hash = require('utils/md5')
const { getRandomInteger } = require('utils/getRandomInteger')

const EXTERNAL_ROUTE = process.env.EXTERNAL_ROUTE || ''

const accessCode = {
  OTSvyaznoyV1: 'sp.otapi.v1.svyaznoy.jwt',
}

module.exports = {
  accessCode,
  redirect: {
    // default: { unlogged: `${EXTERNAL_ROUTE}/auth/signin/` },
    [accessCode.OTSvyaznoyV1]: {
      uiName: 'Online Trade-in API (Svyaznoy)',
      fakeHash: md5Hash(accessCode.OTSvyaznoyV1 + getRandomInteger(100, 999)),
      logged: `${EXTERNAL_ROUTE}/smartprice/otapi/v1/svyaznoy/swagger/`,
      unlogged: `${EXTERNAL_ROUTE}/auth/signin/`,
    },
  },
}
