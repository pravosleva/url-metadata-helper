const { HttpRequestError } = require('../HttpRequestError');

const httpRequestErrorHandler = (obj) => {
  console.log(obj)
  if (obj.request.status === 200) {
    return obj
  } else {
    throw new HttpRequestError(obj.request.status, obj.request.statusText)
  }
}

module.exports = {
  httpRequestErrorHandler
}
