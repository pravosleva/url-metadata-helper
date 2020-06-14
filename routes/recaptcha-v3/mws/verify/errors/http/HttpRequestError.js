const { UniversalError } = require('../UniversalError');

class HttpRequestError extends UniversalError {
  constructor(status, message) {
    super('HttpRequestError')

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpRequestError.prototype)
  }

  getErrorMsg() {
    const normalizedName = this.getReadableCamelCase(this.name)

    return `${normalizedName} ${this.status}: ${this.message}`
  }
}

module.exports = {
  HttpRequestError
}
