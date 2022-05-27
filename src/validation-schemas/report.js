const Joi = require('joi');
const { userRoles } = require('../constants');

module.exports = Joi.object().keys({
  driverId: Joi.string().required(),
  tripId: Joi.string().required(),
  comment: Joi.string().required()
});
