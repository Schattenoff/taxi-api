const router = require('express').Router();

const TripController = require('../controllers/trip');
const requestWrapper = require('../middlewares/request-wrapper');
const isAuthenticated = require('../middlewares/is-authenticated');
const specificRoles = require('../middlewares/specific-roles');
const { userRoles } = require('../constants');
const validator = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas')

router.get(
  '/',
  isAuthenticated,
  specificRoles([userRoles.driver, userRoles.client]),
  validator({query: validationSchemas.getTrip}),
  requestWrapper(TripController.getTrips)
);
router.patch(
  '/:tripId',
  isAuthenticated,
  specificRoles([userRoles.client]),
  requestWrapper(TripController.completeTip)
)
router.post(
  '/',
  isAuthenticated,
  specificRoles([userRoles.client]),
  validator({body: validationSchemas.trip}),
  requestWrapper(TripController.create)
)

module.exports = router;
