const jwt = require('jsonwebtoken')
const { redirect } = require('../cfg')

const { SP_SVYAZNOY_JWT_SECRET, EXPIRES_COOKIES_IN_DAYS, SP_ACCESS_EMAIL, SP_ACCESS_PASSWORD } = process.env
const getUsernameFromEmail = (email) => email.split('@')[0]

if (!SP_SVYAZNOY_JWT_SECRET || !SP_ACCESS_EMAIL || !SP_ACCESS_PASSWORD) {
  throw new Error('!SP_SVYAZNOY_JWT_SECRET || !SP_ACCESS_EMAIL || !SP_ACCESS_PASSWORD')
}

let expiresCookiesTimeInDays
try {
  // eslint-disable-next-line radix
  expiresCookiesTimeInDays = parseInt(EXPIRES_COOKIES_IN_DAYS)
} catch (err) {
  expiresCookiesTimeInDays = 1
}
const getMsByDays = (days) => 1000 * 60 * 60 * 24 * days

module.exports = function (req, res) {
  if (!req.body.code) {
    res.status(401).json({ message: 'Ошибка авторизации #0', code: 'cookie name should be transfered!' })
  }
  /*
   * Check if the username and password is correct
   */
  if (req.body.email === SP_ACCESS_EMAIL && req.body.password === SP_ACCESS_PASSWORD) {
    const jwt4Cookie = jwt.sign(
      {
        id: 1,
      },
      SP_SVYAZNOY_JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * expiresCookiesTimeInDays }
    )
    const uname = getUsernameFromEmail(req.body.email)
    const maxAge = getMsByDays(expiresCookiesTimeInDays)

    res.cookie(req.body.code, jwt4Cookie, { maxAge, httpOnly: true })
    // res.cookie(`${req.body.code}.username`, uname, { maxAge, httpOnly: true })

    // --- Redirect
    let redirectTo = null
    if (redirect[req.body.code]) {
      redirectTo = redirect[req.body.code].logged
    }
    // ---

    res.json({
      id: 1,
      username: uname,
      jwt: jwt4Cookie,
      redirect: redirectTo,
      message: `Logged as ${uname}`,
    })
  } else {
    /*
     * If the username or password was wrong, return 401 ( Unauthorized )
     * status code and JSON error message
     */
    res.status(401).json({ message: 'Wrong username or password!' })
  }
}
