const { HttpRequestError } = require('../HttpRequestError');

const httpRequestErrorHandler = (obj) => {
  console.log(obj)
  if (obj.response.status === 200) {
    return obj
  } else {
    throw new HttpRequestError(obj.response.status, obj.response.statusText)
  }
}

module.exports = {
  httpRequestErrorHandler
}
