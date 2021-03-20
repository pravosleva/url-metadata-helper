const jwt = require('jsonwebtoken')

const { redirect } = require('../cfg')

module.exports = (jwtSecret, cookieName) => (req, res, next) => {
  // console.log(req.cookies)
  /*
   * Check if authorization header is set
   */
  // if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
  if (!!req.cookies && !!req.cookies[cookieName]) {
    try {
      /*
       * Try to decode & verify the JWT token
       * The token contains user's id ( it can contain more informations )
       * and this is saved in req.user object
       */
      req.user = jwt.verify(req.cookies[cookieName], jwtSecret)

      // console.log(req.user)
      // { id: 1, iat: 1616196414, exp: 1616282814 }

      if (req.user.id) {
        if (redirect[cookieName]) {
          return res.redirect(redirect[cookieName].logged)
        }
        return res.status(500).json({
          message: 'Не могу корректно редиректнуть, допишите мапинг',
          code: `You should be redirected. But !redirect[${redirect[cookieName]}]. Check cfg!`,
        })
      }
      return next()
    } catch (err) {
      // console.log(err)
      return next()
    }
  }
  return next()
}
