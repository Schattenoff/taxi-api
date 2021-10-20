const router = require('express').Router();

const AuthController = require('../controllers/auth');
const validator = require('../middlewares/validator');
const requestWrapper = require('../middlewares/request-wrapper');
const validationSchemas = require('../validation-schemas');

router.post(
  '/login',
  validator({body: validationSchemas.login}),
  requestWrapper(AuthController.login)
);
router.post(
  '/register',
  validator({body: validationSchemas.register}),
  requestWrapper(AuthController.register)
);
router.post(
  '/refresh',
  validator({body: validationSchemas.refresh}),
  requestWrapper(AuthController.refreshToken)
);
router.post(
  '/resetPassword',
  validator({body: validationSchemas.resetPassword}),
  requestWrapper(AuthController.resetPassword)
);

module.exports = router;
