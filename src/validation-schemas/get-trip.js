const Joi = require('joi');

module.exports = Joi.object().keys({
  active: Joi.boolean().required()
});
