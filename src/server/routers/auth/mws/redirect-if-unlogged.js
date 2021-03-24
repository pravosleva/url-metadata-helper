const jwt = require('jsonwebtoken')

const { redirect } = require('../cfg')

module.exports = (jwtSecret, cookieName) => (req, res, next) => {
  // console.log(req.cookies)

  try {
    // --- NOTE: REDIRECT UNLOGGED who has NOT permission to work with the current agent
    // 1) Проерим, есть ли конкретная кука в запросе
    if (!!req.cookies && !!req.cookies[cookieName]) {
      // -- 1.1) Verify user by cookie
      /*
       * Try to decode & verify the JWT token
       * The token contains user's id ( it can contain more informations )
       * and this is saved in req.user object
       */
      req.user = jwt.verify(req.cookies[cookieName], jwtSecret)
      if (req.user.id) return next()

      // console.log(user)

      // -- 1.2) Or redirect
      return res.redirect(`${redirect[cookieName].unlogged}?hash=${redirect[cookieName].hash}`)
      // --
    }
    // 2) Нет конкретной куки в запросе (в этой миддлваре проверили только на конкретного контрагента)
    return res.redirect(`${redirect[cookieName].unlogged}?hash=${redirect[cookieName].hash}`)

    // ---
  } catch (err) {
    return res.status(500).json({
      message: 'Fuckup',
      code: `You should be redirected. But !redirect[${redirect[cookieName]}]. Check cfg! (redirect-if-unlogged mw)`,
    })
  }
}
