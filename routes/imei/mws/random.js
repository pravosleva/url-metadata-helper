const Imei = require('node-imei')

const IMEI = new Imei()
// const { getRandomInteger } = require('utils/getRandomInteger')

module.exports = async (_req, res) => {
  res.append('Content-Type', 'application/json')

  const response = {
    success: true,
    result: IMEI.random(),
  }

  res.status(200).send(response)
}
