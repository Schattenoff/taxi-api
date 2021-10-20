const router = require('express').Router();

const isAuthenticated = require('../middlewares/is-authenticated');
const requestWrapper = require('../middlewares/request-wrapper');
const validator = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');
const specificRoles = require('../middlewares/specific-roles');
const { userRoles } = require('../constants');
const OfferController = require('../controllers/offer');

router.post(
  '/',
  isAuthenticated,
  specificRoles([userRoles.driver]),
  validator({body: validationSchemas.offer}),
  requestWrapper(OfferController.createOffer)
);
router.get(
  '/',
  isAuthenticated,
  specificRoles([userRoles.client, userRoles.driver]),
  requestWrapper(OfferController.getOffers)
);
router.delete(
  '/:offerId',
  isAuthenticated,
  specificRoles([userRoles.driver]),
  requestWrapper(OfferController.deleteOffer)
)

module.exports = router;
