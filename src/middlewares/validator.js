const Joi = require('joi');
const ValidationError = require('../errors/validation');

const validate = (object, schema) => {
  if (schema) {
    const validationResult = Joi.validate(object, schema);

    if (validationResult.error) {
      throw new ValidationError(`Validation error! ${validationResult.error.details[0]?.message}`);
    }
  }
}

module.exports = validationOptions => (request, response, next) => {
  validate(request.body, validationOptions.body);
  validate(request.query, validationOptions.query);
  validate(request.params, validationOptions.params);
  next();
};
