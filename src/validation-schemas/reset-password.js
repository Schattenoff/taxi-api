const Joi = require('joi');

module.exports = Joi.object().keys({
  email: Joi.string().regex(/^[a-z0-9.\-_+]+@[a-z0-9\-_+]+\.[a-z0-9. \-_+]+$/i).required().error(errors => {
    if (errors[0] && errors[0].type.includes('regex')) {
      errors[0].message = '\"email\" must be a valid email'
    }

    return errors;
  })
});
