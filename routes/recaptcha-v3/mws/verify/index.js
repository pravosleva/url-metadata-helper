const axios = require('axios');
const { httpRequestErrorHandler } = require('./errors/http/axios/httpRequestErrorHandler');
const { HttpRequestError } = require('./errors/http/HttpRequestError');
const { apiResponseErrorHandler } = require('./errors/api/apiResponseErrorHandler');
const { ApiResponseError } = require('./errors/api/ApiResponseError');

const RECAPTCHAV3_SERVER_KEY = process.env.RECAPTCHAV3_SERVER_KEY;
const RECAPTCHAV3_VERIFY_URL = process.env.RECAPTCHAV3_VERIFY_URL;
// Client key: 6LdjSaQZAAAAABAV1C45jlV802Ydf-gQfqZDzYDs
module.exports = async (req, res) => {
  if (!req.query.captcha) {
    res.status(400).send({
      success: 0,
      captcha: req.body.captcha,
      errors: {
        requestError: ['Captcha token is undefined']
      },
    });
  }

  const byGoogle = await axios.post(`${RECAPTCHAV3_VERIFY_URL}?secret=${RECAPTCHAV3_SERVER_KEY}&response=${req.query.captcha}`)
    .then(httpRequestErrorHandler)
    .then(apiResponseErrorHandler)
    .then((data) => ({
      isOk: true,
      response: data,
    }))
    .catch((err) => {
      console.log(err)
      if (err.response) {
        // Client received an error response (5xx, 4xx)
        // По сути, встроенный httpRequestErrorAxiosHandler
        return {
          isOk: false,
          // eslint-disable-next-line no-useless-concat
          msg: `ERR ${err.response.request.status}: ${err.response.request.statusText}`,
        }
      } else if (err.request) {
        // Client never received a response, or request never left
        // По сути, встроенный networkErrorHandler
        return {
          isOk: false,
          msg: 'ERR: Client never received a response, or request never left',
        }
      } else {
        // Anything else
        switch (true) {
          // NOTE 2
          // Доп. обрабочики (помимо apiResponseErrorHandler) будут нужны,
          // если настройки options будут позволять провалиться дальше: axios по умолчанию все перехватит сам
          // (см. обработку выше)
          // case err instanceof NetworkError:
          case err instanceof HttpRequestError:
          case err instanceof ApiResponseError:
            // case Object.getPrototypeOf(err).name === 'Error':
            return {
              isOk: false,
              msg: err.getErrorMsg(),
            }
          case err instanceof TypeError:
            // case Object.getPrototypeOf(err).name === 'Error':
            return {
              isOk: false,
              msg: err.message,
            }
          default:
            return {
              isOk: false,
              msg: 'AXIOS ERR: Не удалось обработать ошибку',
            }
        }
      }
    })

  if (byGoogle.isOk) {
    if (byGoogle.response.success) {
      res.status(200).send({
        success: 1,
        original: byGoogle.response,
      });
    } else {
      res.status(400).send({
        success: 0,
        captcha: req.body.captcha,
        original: byGoogle.response,
        errors: {
          requestError: ['Неизвестная ошибка']
        },
      });
    }
  } else {
    res.status(400).send({
      success: 0,
      captcha: req.body.captcha,
      errors: {
        requestError: [byGoogle.msg]
      },
    });
  }
}
