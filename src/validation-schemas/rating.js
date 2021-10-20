const Joi = require('joi');

module.exports = Joi.object().keys({
  rating: Joi.number().min(1).max(10).required(),
  tripId: Joi.string().required()
});
