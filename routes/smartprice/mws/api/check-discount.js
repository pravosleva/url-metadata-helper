const { getRandomInteger } = require('utils/getRandomInteger')
// const getProbabilityRandom = require('utils/getProbabilityRandom')

/* SAMPLE:
curl -X POST https://smartprice.ru/check-discount/ -H 'Content-Type: application/json' -d '{
    "promo": "spotysmart"
}'
*/
// probabilityRandom(40, 25, 35, ['Optionlist reset', 'Optionlist reset, we are working on it...', 'Optionlist reset, sorry'])

module.exports = async (req, res) => {
  const toBeOrNotToBe = getRandomInteger(0, 1)
  // const toBeOrNotToBe = getProbabilityRandom(2, 3, 95, [true, true, true])
  const value = getRandomInteger(100, 999)

  // res.status(500).send('In progress...')
  const successSample = {
    exists: true,
    rate: 0.88,
    pk: value,
    restricted: false,
    valid_until: '2020-12-29T21:00:00Z',
  }
  const faillSample = {
    exists: false,
  }
  let result
  if (toBeOrNotToBe) {
    result = { ...successSample }
  } else {
    result = { ...faillSample }
  }
  res.status(toBeOrNotToBe ? 200 : 400).send({
    ...result,
    _originalBody: req.body,
  })
}
