const jwt = require('jsonwebtoken')

const { redirect } = require('../cfg')

module.exports = (cookieName) => (req, res, next) => {
  // console.log(req.cookies)
  /*
   * Check if authorization header is set
   */
  // if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
  if (!req.cookies || !req.cookies[cookieName]) {
    try {
      if (redirect[cookieName]) {
        return res.redirect(redirect[cookieName].unlogged)
      }
      return res.status(500).json({
        message: 'Не могу корректно редиректнуть, допишите мапинг',
        code: `You should be redirected. But !redirect[${redirect[cookieName]}]. Check cfg!`,
      })
    } catch (err) {
      // console.log(err)
      return next()
    }
  }
  return next()
}
