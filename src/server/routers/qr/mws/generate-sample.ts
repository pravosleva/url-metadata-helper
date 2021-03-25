import { Request as IRequest, Response as IResponse } from 'express'
import QRCode from 'qrcode'
import { promisify } from 'es6-promisify'

const genDataUrl: (payload: string) => void = promisify(QRCode.toDataURL.bind(QRCode))

export const generateSample = async (req: IRequest, res: IResponse) => {
  const { payload } = req.query

  if (!payload) {
    return res
      .status(401)
      .json({ ok: false, message: 'Missing required parameter: "payload"' })
  }

  const dataUrl = await genDataUrl(String(payload))

  return res.status(200).json({ ok: true, src: dataUrl })
}
