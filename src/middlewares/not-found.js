const NotFoundError = require('../errors/not-found');

module.exports = (request, response, next) => {
  response.statusCode = 404;
  response.send({message: 'Route not found', statusCode: 404});
}
