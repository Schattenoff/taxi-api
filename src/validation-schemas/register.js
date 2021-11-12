const Joi = require('joi');
const { userRoles } = require('../constants');

module.exports = Joi.object().keys({
  email: Joi.string().regex(/^[a-z0-9.\-_+]+@[a-z0-9\-_+]+\.[a-z0-9. \-_+]+$/i).required().error(errors => {
    if (errors[0] && errors[0].type.includes('regex')) {
      errors[0].message = '\"email\" must be a valid email'
    }

    return errors;
  }),
  password: Joi.string().min(6).max(20).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid(userRoles.client, userRoles.driver).required(),
  car: Joi.when('role', {
    is: Joi.string().valid(userRoles.driver),
    then: Joi.object().keys({
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
      color: Joi.string().required()
    }).required(),
    otherwise: Joi.forbidden()
  })
});
