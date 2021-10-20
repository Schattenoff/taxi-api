const Joi = require('joi');

module.exports = Joi.object().keys({
  page: Joi.number().required(),
  size: Joi.number().required()
});
