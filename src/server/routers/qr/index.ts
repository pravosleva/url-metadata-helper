import express, { Express as IExpress } from 'express'
import { generateSample } from './mws/tst.generate-sample'
import { tryAuthOnOtherDevice } from './mws/tst.try-auth-on-other-device'
import { generate } from './mws/generate'

const qrApi: IExpress = express()

qrApi.get('/tst.generate', generateSample)
qrApi.get('/tst.try-auth-on-other-device', tryAuthOnOtherDevice)

qrApi.post('/generate', generate)

export { qrApi }
