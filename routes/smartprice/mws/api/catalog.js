const { getRandomInteger } = require('utils/getRandomInteger')

module.exports = async (req, res) => {
  res.status(200).send(String(getRandomInteger(500, 600)))
}
