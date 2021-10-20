const Joi = require('joi');

module.exports = Joi.object().keys({
  refreshToken: Joi.string().required()
});
