const UnauthorizedAccessError = require('../errors/unauthorized-access');

module.exports = roles => (request, response, next) => {
  if (roles.includes(request.user.role)) {
    next();
  } else {
    next(new UnauthorizedAccessError('You have no rules to perform this action!'));
  }
};
