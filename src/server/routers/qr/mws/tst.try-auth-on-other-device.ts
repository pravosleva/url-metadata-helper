import { Response as IResponse } from 'express'
import { ICustomRequest } from '../../../utils/interfaces'

export const tryAuthOnOtherDevice = async (req: ICustomRequest, res: IResponse) => {
  const { required_req_id } = req.query
  const _express = {
    'req.id': req.id,
    loggedSize: req.loggedMap.state.size
  }

  if (!required_req_id) {
    return res
      .status(401)
      .json({ _express, ok: false, message: 'Missing required parameter: "required_req_id"' })
  }

  try {
    // --- NOTE: При генерации qr создаем возможность
    // аутентифицироваться на других устройствах, используя req.id:
    if (typeof required_req_id !== 'string') {
      throw new Error('typeof req.query.required_req_id should be string!')
    }

    const result = await req.loggedMap.setLoggedSessionOrDelete(required_req_id)
      .then((message: string) => ({
        isOk: true,
        message,
      }))
      .catch((err) => ({
        isOk: false,
        message: typeof err === 'string' ? err : err.message || 'No err.message',
      }))
    // ---

    return res.status(result.isOk ? 200 : 500).json({
      _express: {
        ..._express, 
        loggedSize: req.loggedMap.state.size,
      },
      ok: result.isOk,
      message: result.message,
    })
  } catch (err) {
    return res.status(500).json({
      _express: {
        ..._express, 
        loggedSize: req.loggedMap.state.size,
      },
      ok: false,
      message: typeof err === 'string' ? err : err?.message || 'No err.message',
    })
  }
}
