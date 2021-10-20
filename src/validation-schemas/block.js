const Joi = require('joi');

module.exports = Joi.object().keys({
  blocked: Joi.boolean().required(),
  blockedUntil: Joi.number().optional(),
});
