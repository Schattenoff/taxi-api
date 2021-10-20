const UserRepository = require('../repositories/user');
const TripRepository = require('../repositories/trip');
const NotFoundError = require('../errors/not-found');
const { userRoles } = require('../constants');
const ConflictError = require('../errors/conflict');

class UserController {

  static async getListOfUsers(request, response) {
    const { page, size } = request.query;

    response.send(await UserRepository.getAll(Number(page), Number(size)));
  }

  static async blockOrUnlockUser(request, response) {
    const { userId } = request.params;
    const { blockedUntil, blocked } = request.body;
    const user = await UserRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    await UserRepository.update(userId, {
      blocked,
      blockedUntil
    });
    response.status(204).send();
  }

  static async setUserRating(request, response) {
    const { userId } = request.params;
    const { rating: ratingFromTheUser, tripId } = request.body;
    const user = await UserRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }
    if (user.role === userRoles.admin) {
      throw new ConflictError('Admins don`t have rating.');
    }

    const { rating = 0, feedbacksCount = 0 } = user;
    const calculatedRating = Number(Number((feedbacksCount * rating + ratingFromTheUser) / (feedbacksCount + 1)).toPrecision(2))
    await Promise.all([
      UserRepository.update(userId, {
        feedbacksCount: feedbacksCount + 1,
        rating: calculatedRating 
      }),
      TripRepository.updateTrip(tripId, {
        rating: calculatedRating
      })
    ]);

    response.status(204).send();
  }

  static async me(request, response) {
    response.send(await UserRepository.getUserById(request.user.uid));
  }

}

module.exports = UserController;
