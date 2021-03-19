const jwt = require('jsonwebtoken')

const { SP_JWT_SECRET, EXPIRES_COOKIES_IN_DAYS } = process.env

// eslint-disable-next-line radix
const expiresCookiesTimeInDays = parseInt(EXPIRES_COOKIES_IN_DAYS)
const getMsByDays = (days) => 1000 * 60 * 60 * 24 * days

module.exports = function (req, res) {
  if (!req.body.code) {
    res.status(401).json({ message: 'Ошибка авторизации #0', code: 'cookie name should be transfered!' })
  }
  /*
   * Check if the username and password is correct
   */
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    const jwt4Cookie = jwt.sign(
      {
        id: 1,
      },
      SP_JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * expiresCookiesTimeInDays }
    )

    res.cookie(req.body.code, jwt4Cookie, { maxAge: getMsByDays(expiresCookiesTimeInDays), httpOnly: true })
    res.cookie(`${req.body.code}Username`, req.body.username, {
      maxAge: getMsByDays(expiresCookiesTimeInDays),
      httpOnly: true,
    })

    res.json({
      id: 1,
      username: 'admin',
      jwt,
      redirect: '/',
    })
  } else {
    /*
     * If the username or password was wrong, return 401 ( Unauthorized )
     * status code and JSON error message
     */
    res.status(401).json({ message: 'Wrong username or password!' })
  }
}
