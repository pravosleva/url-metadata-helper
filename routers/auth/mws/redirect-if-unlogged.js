const jwt = require('jsonwebtoken')

const { redirect } = require('../cfg')

module.exports = (jwtSecret, cookieName) => (req, res, next) => {
  // console.log(req.cookies)
  // console.log(`DEFAULT REDIRECT: ${redirect.default.unlogged}`)
  /*
   * Check if authorization header is set
   */
  // if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
  if (!req.cookies || !req.cookies[cookieName]) {
    return res.redirect(`${redirect[cookieName].unlogged}?hash=${redirect[cookieName].fakeHash}`)
    // return res.status(200).json({
    //   link: redirect.default.unlogged,
    //   message: 'TODO: redirect by Express or NGINX?',
    // })
  }

  try {
    req.user = jwt.verify(req.cookies[cookieName], jwtSecret)

    if (req.user.id) {
      return next()
    }
  } catch (err) {
    if (!!req.cookies && !!req.cookies[cookieName]) {
      if (redirect[cookieName]) {
        return res.redirect(`${redirect[cookieName].unlogged}?hash=${redirect[cookieName].fakeHash}`)
        // return res.status(200).json({ link: redirect[cookieName].unlogged, message: 'TODO: redirect by Express or NGINX? _' })
      }
      return res.status(500).json({
        message: 'Не могу корректно редиректнуть, допишите мапинг',
        code: `You should be redirected. But !redirect[${redirect[cookieName]}]. Check cfg!`,
      })
    }
  }
  return next()
}
