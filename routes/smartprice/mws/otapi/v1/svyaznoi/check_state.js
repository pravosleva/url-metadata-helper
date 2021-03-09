const { getRandomInteger } = require('utils/getRandomInteger')

const toClient = [
  {
    ok: false,
    message: 'Test',
  },
  {
    ok: true,
    devices: {
      '777': {
        state: 'ok',
        condition_limit: 'works',
        condition_limit_reason: 'case_defects',
        price: 1909,
        price_rub: 1909,
      },
    },
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
