const { getRandomInteger } = require('utils/getRandomInteger')

const toClient = [
  {
    ok: false,
    code: 'access_denied',
    message: 'Недопустимая операция',
    extra: null,
  },
  {
    ok: true,
  },
]

module.exports = async (req, res) => {
  const toBeOrNotToBe = getRandomInteger(0, 1)

  setTimeout(() => {
    res.status(200).send({
      ...toClient[toBeOrNotToBe],
      _originalBody: req.body,
    })
  }, 500)
}
