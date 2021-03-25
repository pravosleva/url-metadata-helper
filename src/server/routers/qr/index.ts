import express, { Express as IExpress } from 'express'
import { generateSample } from './mws/generate-sample'
import { generate } from './mws/generate'

const qrApi: IExpress = express()

qrApi.get('/generate', generateSample)
qrApi.post('/generate', generate)

export { qrApi }
