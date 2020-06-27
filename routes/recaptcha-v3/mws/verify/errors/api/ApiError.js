const { UniversalError } = require("../UniversalError");

class apiError extends UniversalError {
  constructor(errors) {
    super("apiError");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, apiError.prototype);
  }

  getErrorMsg() {
    const normalizedName = this.getReadableCamelCase(this.name);
    let errorsStr = "";

    if (!!this.errors && Object.keys(this.errors).length > 0) {
      Object.keys(this.errors).forEach((e) => {
        if (Array.isArray(this.errors[e])) {
          this.errors[e].forEach((str) => {
            errorsStr += `, ${str}`;
          });
        }
      });
    } else {
      errorsStr = ", Ошибки не получены с бэка";
    }

    return normalizedName.concat(": ", errorsStr.slice(2));
  }
}

module.exports = {
  apiError,
};
