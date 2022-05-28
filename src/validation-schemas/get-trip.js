const Joi = require('joi');

module.exports = Joi.object().keys({
  active: Joi.boolean().required(),
  page: Joi.number().optional(),
  size: Joi.number().optional()
});
