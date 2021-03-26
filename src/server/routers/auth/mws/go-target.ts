import {
  Response as IResponse,
  // NextFunction as INext,
} from 'express'
import { ICustomRequest } from '../../../utils/interfaces'
import jwt from 'jsonwebtoken'
import { hashedRedirectMap } from '../cfg'

const getMsByDays = (days: number): number => 1000 * 60 * 60 * 24 * days

export const goTarget = (expiresCookiesTimeInDays: number) => async (req: ICustomRequest, res: IResponse, next: any) => {
  if (!req.query.logged_req_id || typeof req.query.logged_req_id !== 'string')
    return res
      .status(401)
      .json({ message: 'Нехрен сюда лезть без правильных параметров', code: '!req.query.logged_req_id is true' })

  // TODO: Check is req.query.success_url, req.fail_url valid url

  const loggedReqId = req.query.logged_req_id
  const hasLoggedReqIdInState = req.loggedMap.state.has(loggedReqId)

  try {
    if (typeof loggedReqId !== 'string') {
      throw new Error('typeof req.query.logged_req_id should be string!')
    }
    if (!hasLoggedReqIdInState) {
      throw new Error('Нет такой сессии для аутентификации на доп устройствах: !hasLoggedReqIdInState')
  
      // return res.status(200).redirect(fail_url)
      // return res.status(500).json({ ok: false, mesage: 'TODO' })
    }

    const { hash, success_url } = req.loggedMap.state.get(loggedReqId)
    
    // --- NOTE: Set cookie before redirect
    // 1. Find cfg target item by hash
    let targetCfgItem = null
    let targetCode = null

    if (!hashedRedirectMap.has(hash)) {
      throw new Error('Многое поменялось пока Вы спали: !hashedRedirectMap.has(hash)')
    }

    targetCfgItem = hashedRedirectMap.get(hash)
    targetCode = targetCfgItem.code
    if (!targetCfgItem || !targetCode)
      return res
        .status(401)
        .json({ message: 'Что-то пошло не так', code: 'target cfg item not found' })

    const jwt4Cookie = jwt.sign({ id: 1 }, targetCfgItem.jwtSecret, {
      expiresIn: 60 * 60 * 24 * expiresCookiesTimeInDays,
    })
    const maxAge = getMsByDays(expiresCookiesTimeInDays)
    res.cookie(targetCode, jwt4Cookie, { maxAge, httpOnly: true })
    // ---

    await req.loggedMap.addLoggedSessionOrDelete(loggedReqId)
      .then((_msg) => {
        // res.set('service_msg', msg)
        res.status(200).redirect(success_url)
      })
      .catch((msg) => {
        // res.set('service_msg', msg)
        // TODO: redirect to error page
        // res.status(500).json({
        //   ok: false,
        //   message: msg
        // })

        // NOTE: Если страница требует авторизации, пользователь все равно будет переброшен на страницу авторизации
        res.status(200).redirect(success_url)
      })
  } catch (err) {
    return res.status(500).json({
      _originalReqQuery: req.query,
      _express: {
        loggedSize: req.loggedMap.state.size,
      },
      ok: false,
      message: typeof err === 'string' ? err : err?.message || 'No err.message',
    })
  }
}
