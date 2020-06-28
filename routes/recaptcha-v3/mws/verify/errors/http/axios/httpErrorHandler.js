const { HttpError } = require("../HttpError");

const httpErrorHandler = (obj) => {
  console.log(obj);
  if (obj.status === 200) {
    return obj.data;
  } else {
    throw new HttpError(obj.request.status, obj.request.statusText);
  }
};

module.exports = {
  httpErrorHandler,
};
