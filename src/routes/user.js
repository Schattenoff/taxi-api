const router = require('express').Router();

const { userRoles } = require('../constants');
const UserController = require('../controllers/user');
const isAuthenticated = require('../middlewares/is-authenticated');
const requestWrapper = require('../middlewares/request-wrapper');
const specificRoles = require('../middlewares/specific-roles');
const validator = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');

router.get(
  '/',
  isAuthenticated,
  specificRoles([userRoles.admin]),
  requestWrapper(UserController.getListOfUsers)
);
router.get(
  '/me',
  isAuthenticated,
  requestWrapper(UserController.me)
);
router.patch(
  '/:userId',
  isAuthenticated,
  specificRoles([userRoles.client, userRoles.driver]),
  validator({body: validationSchemas.rating}),
  requestWrapper(UserController.setUserRating)
);
router.patch(
  '/:userId/blocked',
  isAuthenticated,
  specificRoles([userRoles.admin]),
  validator({body: validationSchemas.block}),
  requestWrapper(UserController.blockOrUnlockUser)
);
router.post(
  '/:userId/photo',
  isAuthenticated,
  specificRoles([userRoles.driver]),
  requestWrapper(UserController.saveCarPhoto)
);

module.exports = router;
