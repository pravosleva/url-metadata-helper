/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const md5Hash = require('utils/md5')

const EXTERNAL_ROUTE = process.env.EXTERNAL_ROUTE || ''
const { SP_SVYAZNOY_JWT_SECRET, SP_ACCESS_PASSWORD } = process.env

if (!SP_SVYAZNOY_JWT_SECRET || !SP_ACCESS_PASSWORD) {
  throw new Error('!SP_SVYAZNOY_JWT_SECRET || !SP_ACCESS_PASSWORD')
}

const accessCode = {
  OTSvyaznoyV1: 'sp.otapi.v1.svyaznoy.jwt',
  Homepage: 'access-to-homepage',
}
// --- Check accessCode map:
const hasDuplicate = (arr) => new Set(arr).size !== arr.length
const keys = Object.values(accessCode)
if (hasDuplicate(keys)) {
  const result = keys.reduce(
    (acc, cur) => {
      if (acc[cur]) {
        acc.duplicates.push(cur)
      } else {
        acc[cur] = true
      }
      return acc
    },
    { duplicates: [] }
  )

  throw new Error(`🚫 Check cfg! Douplicate keys: ${result.duplicates.join(', ')}`)
}
// ---

const redirect = {
  [accessCode.OTSvyaznoyV1]: {
    jwtSecret: SP_SVYAZNOY_JWT_SECRET,
    uiName: 'Online Trade-in API (Svyaznoy)',
    accessPassword: SP_ACCESS_PASSWORD,
    hash: md5Hash(accessCode.OTSvyaznoyV1),
    logged: `${EXTERNAL_ROUTE}/smartprice/otapi/v1/svyaznoy/swagger/`,
    unlogged: `${EXTERNAL_ROUTE}/auth/signin/`,
  },
  [accessCode.Homepage]: {
    jwtSecret: 'ACCESS_TO_HOMEPAGE_SECRET_JWT_SAMPLE',
    uiName: 'Homepage',
    accessPassword: 'home',
    hash: md5Hash(accessCode.Homepage),
    logged: `${EXTERNAL_ROUTE}/`,
    unlogged: `${EXTERNAL_ROUTE}/auth/signin/`,
  },
}
const hashedRedirectMap = new Map()

for (const key in redirect) {
  const hash = md5Hash(key)

  hashedRedirectMap.set(hash, { ...redirect[key], code: key })
}

module.exports = {
  accessCode,
  redirect,
  hashedRedirectMap,
}
