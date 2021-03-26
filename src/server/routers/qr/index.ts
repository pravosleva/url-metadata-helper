import express, { Express as IExpress } from 'express'
import { generateSample } from './mws/tst.generate-sample'
import { tryAuthOnOtherDevice } from './mws/tst.try-auth-on-other-device'
import { getLoggedMap } from './mws/tst.get-logged-map'
import { generate } from './mws/generate'
import { clearState } from './mws/clear-state'
import { swagger } from './mws/swagger'

import { EAccessCode, redirect } from '../auth/cfg'
import redirectIfUnloggedMw from '../auth/mws/redirect-if-unlogged'

const qrApi: IExpress = express()

qrApi.get('/tst.generate', generateSample)
qrApi.get('/tst.try-auth-on-other-device', tryAuthOnOtherDevice)
qrApi.get('/tst.get-logged-map', getLoggedMap)

qrApi.post('/generate', generate)
qrApi.get('/clear-state', clearState)
qrApi.use(
  '/swagger',
  redirectIfUnloggedMw(redirect[EAccessCode.QRSwagger].jwtSecret, EAccessCode.QRSwagger),
  swagger,
)

export { qrApi }
