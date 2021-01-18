const { getRandomInteger } = require('utils/getRandomInteger')

module.exports = async (req, res) => {
  res.append('Content-Type', 'application/json')

  // TODO: if !delivery -> 403 поле delivery обязательно

  const toBeOrNotToBe = Boolean(getRandomInteger(0, 1))
  const response = {
    _originalBody: req.body,
  }
  if (toBeOrNotToBe) {
    response.id = getRandomInteger(1111, 2222)
  }

  res.status(toBeOrNotToBe ? 200 : 400).send(response)
}
