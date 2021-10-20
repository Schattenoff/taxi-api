const Joi = require('joi');

module.exports = Joi.object().keys({
  orderId: Joi.string().required(),
});
