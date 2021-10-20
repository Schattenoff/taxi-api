module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Accept-Language, X-Authorization')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
}
