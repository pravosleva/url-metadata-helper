const { NetworkError } = require('./NetworkError')

export const networkErrorHandler = (res) => {
  if (!!res.status) {
    return res
  } else {
    throw new NetworkError()
  }
}
