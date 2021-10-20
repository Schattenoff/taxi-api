const { DEFAULT_BACKEND_ERROR_CODE, fromFirebaseErrorToCustom } = require('../constants');


module.exports = (error, request, response, next) => {
  const myError = fromFirebaseErrorToCustom.get(error.code) ? fromFirebaseErrorToCustom.get(error.code) : error;
  const statusCode = myError.status ? myError.status : DEFAULT_BACKEND_ERROR_CODE;
  return response
    .status(statusCode)
    .send({
      statusCode,
      message: myError.message
    });
};
