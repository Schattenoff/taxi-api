module.exports = callback => async (request, response, next) => {
  try {
    await callback(request, response, next);
  } catch (exception) {
    next(exception);
  }
}