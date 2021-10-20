const router = require('express').Router();

const OrderController = require('../controllers/order');
const isAuthenticated = require('../middlewares/is-authenticated');
const requestWrapper = require('../middlewares/request-wrapper');
const specificRoles = require('../middlewares/specific-roles');
const validator = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');
const { userRoles } = require('../constants');

router.delete(
  '/:orderId',
  isAuthenticated,
  specificRoles([userRoles.client]),
  requestWrapper(OrderController.deleteOrder)
);
router.post(
  '/',
  isAuthenticated,
  specificRoles([userRoles.client]),
  validator({body: validationSchemas.order}),
  requestWrapper(OrderController.createOrder)
);
router.get(
  '/',
  isAuthenticated,
  specificRoles([userRoles.client, userRoles.driver]),
  requestWrapper(OrderController.getOrders)
);

module.exports = router;
