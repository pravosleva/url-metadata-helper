/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import md5Hash from '../../utils/md5'

const EXTERNAL_ROUTE = process.env.EXTERNAL_ROUTE || ''
const { BASE_PROTOCOL_HOST, SP_SVYAZNOY_JWT_SECRET, SP_ACCESS_PASSWORD } = process.env

if (!BASE_PROTOCOL_HOST || !SP_SVYAZNOY_JWT_SECRET || !SP_ACCESS_PASSWORD) {
  throw new Error('!BASE_PROTOCOL_HOST || !SP_SVYAZNOY_JWT_SECRET || !SP_ACCESS_PASSWORD')
}

enum EAccessCode {
  OTSvyaznoyV1 = 'sp.otapi.v1.svyaznoy.jwt',
  Homepage = 'demo.access-to-homepage.jwt',
}

// --- Check EAccessCode map:
const hasDuplicate = (arr: string[]): boolean => new Set(arr).size !== arr.length
const keys = Object.values(EAccessCode)
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
const qr = {
  targetUrl: `${BASE_PROTOCOL_HOST}${EXTERNAL_ROUTE}/auth/go-target`,
}
const redirect = {
  [EAccessCode.OTSvyaznoyV1]: {
    jwtSecret: SP_SVYAZNOY_JWT_SECRET,
    uiName: 'Online Trade-in API (Svyaznoy)',
    accessPassword: SP_ACCESS_PASSWORD,
    hash: md5Hash(EAccessCode.OTSvyaznoyV1),
    logged: `${EXTERNAL_ROUTE}/smartprice/otapi/v1/svyaznoy/swagger/`,
    unlogged: `${EXTERNAL_ROUTE}/auth/signin/`,
    qr,
  },
  [EAccessCode.Homepage]: {
    jwtSecret: 'ACCESS_TO_HOMEPAGE_SECRET_JWT_SAMPLE',
    uiName: 'Homepage',
    accessPassword: 'home',
    hash: md5Hash(EAccessCode.Homepage),
    logged: `${EXTERNAL_ROUTE}/`,
    unlogged: `${EXTERNAL_ROUTE}/auth/signin/`,
    qr,
  },
}
const hashedRedirectMap = new Map()

for (const key in redirect) {
  const hash = md5Hash(key)

  hashedRedirectMap.set(hash, { ...redirect[key], code: key })
}

const accessCode = EAccessCode

export { accessCode, redirect, hashedRedirectMap }
