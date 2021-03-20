const EXTERNAL_ROUTE = process.env.EXTERNAL_ROUTE || ''

const maping = {
  OTSvyaznoyV1: 'sp.otapi.v1.svyaznoy.jwt',
}

module.exports = {
  maping,
  redirect: {
    [maping.OTSvyaznoyV1]: {
      logged: `${EXTERNAL_ROUTE}/smartprice/otapi/v1/svyaznoy/swagger/`,
      unlogged: `${EXTERNAL_ROUTE}/auth/signin`,
    },
  },
}
