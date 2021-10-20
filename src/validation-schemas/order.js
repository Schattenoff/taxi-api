const Joi = require('joi');

module.exports = Joi.object().keys({
  source: Joi.string().required(),
  destination: Joi.string().required()
});
