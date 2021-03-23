const jwt = require('jsonwebtoken')

const { redirect } = require('../cfg')

module.exports = (jwtSecret, cookieName) => (req, res, next) => {
  // --- NOTE: REDIRECT LOGGED CLIENT who has permission to work with the current agent
  // 1) Проерим, есть ли кука
  if (!!req.cookies && !!req.cookies[cookieName]) {
    // -- 2) Если есть хэш в запросе, проверим, соотносится ли он с кукой в запросе
    if (req.query.hash) {
      if (req.query.hash === redirect[cookieName].hash) {
        // - 3) Верифицируем клиента по его куке (как имеющего доступ к текущему контрагенту)
        /*
         * Try to decode & verify the JWT token
         * The token contains user's id ( it can contain more informations )
         * and this is saved in req.user object
         */
        req.user = jwt.verify(req.cookies[cookieName], jwtSecret)
        if (req.user.id) return res.redirect(redirect[cookieName].logged)
        // -
      }
    }
    // --
  }
  // ---

  return next()
}
