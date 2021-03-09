const { getRandomInteger } = require('utils/getRandomInteger')

const toClient = [
  {
    ok: false,
    message: 'Test',
  },
  {
    ok: true,
  },
]

/* Body sample:
{
	"birth_date": "13.04.1988",
	"email": "123@123.ru",
	"first_name": "Den",
	"id_address": "Lubyanka 1",
	"id_city": "Moscow",
	"id_date_of_issue": "10.10.2008",
	"id_issued_by": "Moscow cop",
	"id_issuing_agency_code": "123-333",
	"id_number": "123412",
	"id_serial_number": "4607",
	"id_type": "passport",
	"last_name": "Pol",
	"patronymic": "Vla",
	"phone": "+7(916)123-1231"
}
*/

module.exports = async (req, res) => {
  const toBeOrNotToBe = getRandomInteger(0, 1)

  setTimeout(() => {
    res.status(200).send({
      ...toClient[toBeOrNotToBe],
      _originalBody: req.body,
    })
  }, 500)
}
