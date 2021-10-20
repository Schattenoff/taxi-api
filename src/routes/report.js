const router = require('express').Router();

const requestWrapper = require('../middlewares/request-wrapper');
const isAuthenticated = require('../middlewares/is-authenticated');
const specificRoles = require('../middlewares/specific-roles');
const { userRoles } = require('../constants');
const ReportController = require('../controllers/report');
const validator = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');

router.get(
  '/',
  isAuthenticated,
  specificRoles([userRoles.admin]),
  requestWrapper(ReportController.getAll)
);
router.post(
  '/',
  isAuthenticated,
  specificRoles([userRoles.client]),
  validator({body: validationSchemas.report}),
  requestWrapper(ReportController.create)
);

module.exports = router;
