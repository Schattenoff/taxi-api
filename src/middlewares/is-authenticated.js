const { getAuth } = require('firebase-admin/auth');

const AuthenticationError = require('../errors/authentication');
const UnauthorizedError = require('../errors/unauthorized-access');

module.exports = async (request, response, next) => {
  const { authorization } = request.headers;
  const split = authorization?.split(' ');

  if (!authorization || !authorization.startsWith('Bearer') || split.length !== 2) {
    next(new AuthenticationError('You are not authenticated'));
  }

  try {
    request.user = await getAuth().verifyIdToken(split[1], true);
    next();
  } catch(exception) {
    next(new UnauthorizedError('You access token has expired'));
  }
};
