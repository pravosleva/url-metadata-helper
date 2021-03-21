/* eslint-disable no-restricted-syntax */
const jwt = require('jsonwebtoken')
const { redirect: cfg } = require('../cfg')

// const getUsernameFromEmail = (email) => (email ? email.split('@')[0] : 'Noname')
const getMsByDays = (days) => 1000 * 60 * 60 * 24 * days

module.exports = (expiresCookiesTimeInDays) =>
  function (req, res) {
    if (!req.body.hash) {
      return res.status(401).json({ message: 'Ошибка авторизации #02', code: 'req.body.hash should be transfered!' })
    }
    /*
     * Check if the password is correct
     */
    // 1. Find cfg target item by hash
    let targetCfgItem = null
    let targetCode = null
    for (const key in cfg) {
      if (cfg[key].hash === req.body.hash) {
        targetCfgItem = cfg[key]
        targetCode = key
      }
    }
    if (!targetCfgItem || !targetCode) return res.status(500).json({ message: '#03 target cfg item not found' })

    // 2. Auth by passwd
    if (!targetCfgItem.envName) {
      return res
        .status(500)
        .json({ message: 'Ошибка авторизации #04', code: `Check cfg: !targetCfgItem.envName is true` })
    }
    if (!process.env[targetCfgItem.envName]) {
      return res
        .status(500)
        .json({ message: 'Ошибка авторизации #05', code: `Fuckup: !process.env[${targetCfgItem.envName}] is true` })
    }
    if (!!process.env[targetCfgItem.envName] && req.body.password === process.env[targetCfgItem.envName]) {
      const jwt4Cookie = jwt.sign({ id: 1 }, targetCfgItem.jwtSecret, {
        expiresIn: 60 * 60 * 24 * expiresCookiesTimeInDays,
      })
      const maxAge = getMsByDays(expiresCookiesTimeInDays)

      // 3. Set cookie
      res.cookie(targetCode, jwt4Cookie, { maxAge, httpOnly: true })

      return res.json({
        id: 1,
        jwt: jwt4Cookie,
        redirect: cfg[targetCode].logged,
        uiName: cfg[targetCode].uiName || 'Noname',
        message: 'Logged',
      })
    }
    /*
     * If the username or password was wrong, return 401 ( Unauthorized )
     * status code and JSON error message
     */
    return res.status(401).json({ message: 'Wrong username or password!' })
  }
