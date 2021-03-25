import { Response as IResponse } from 'express'
import { ICustomRequest } from '../../../utils/interfaces'


export const generateSample = async (req: ICustomRequest, res: IResponse) => {
  const { payload } = req.query

  const _express = {
    'req.id': req.id,
    loggedSize: req.loggedMap.state.size
  }

  if (!payload) {
    return res
      .status(401)
      .json({ _express, ok: false, message: 'Missing required parameter: "payload"' })
  }

  // --- NOTE: При генерации qr создаем возможность
  // аутентифицироваться на других устройствах, используя req.id:
  const dataUrl = await req.loggedMap.addExistsSession(req.id, String(payload))
  // ---

  return res.status(200).json({
    _express: {
      ..._express, 
      loggedSize: req.loggedMap.state.size,
    },
    ok: true,
    src: dataUrl,
  })
}
