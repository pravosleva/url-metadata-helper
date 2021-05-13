/* eslint-disable prefer-destructuring */
// const { getRandomInteger } = require('../../../../../../utils/getRandomInteger')
const delay = require('../../../../../../utils/delay')

// const { SUCCESS_ANYWAY } = process.env

const toClient = {
  dry_run: [
    {
      ok: true,
      result: [
        {
          state: 'success',
          scheduled_date: '2021-05-11',
          courier: 'cdek',
          id: 15361,
          is_cdek: true,
          cdek_dispatch_number: '1234567890',
          priority: 3,
        },
      ],
    },
    {
      ok: true,
      package_ids: ['1245135', '1245136', '1245137'],
      products: [
        {
          imei: '354021080294067',
          package_id: '1245135',
          name: 'Samsung Galaxy A5 2017 black_sky 32 GB',
        },
        {
          imei: '355766078354161',
          package_id: '1245136',
          name: 'Apple iPhone 6S rose_gold 16 GB',
        },
      ],
    },
  ],
}

module.exports = async (req, res) => {
  res.append('Content-Type', 'application/json')

  // TODO: if !delivery -> 403 поле delivery обязательно

  if (req.body.dry_run === true || req.body.dry_run === false) {
    res.status(500).send({ ok: false, message: 'Обязательное поле: req.body.dry_run' })
  }

  // const toBeOrNotToBe = SUCCESS_ANYWAY === '1' ? 1 : Boolean(getRandomInteger(0, 1))
  let base
  if (req.body.dry_run === true) {
    base = toClient.dry_run[1]
  } else {
    base = toClient.dry_run[0]
  }
  const response = {
    ...base,
    _originalBody: req.body,
  }

  // res.status(toBeOrNotToBe ? 200 : 400).send(response)

  await delay(3000)

  res.status(200).send(response)
}
