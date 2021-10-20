const Joi = require('joi');

module.exports = Joi.object().keys({
  offerId: Joi.string().required()
});
