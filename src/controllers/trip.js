const TripRepository = require('../repositories/trip');
const OfferRepository = require('../repositories/offer');
const OrderRepository = require('../repositories/order');
const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');
const UserRepository = require('../repositories/user');

class TripController {

  static async create(request, response) {
    const { offerId } = request.body;

    const [offer, clientOrder, activeTrips] = await Promise.all([
      OfferRepository.getOfferById(offerId),
      OrderRepository.getClientOrder(request.user.uid),
      TripRepository.getTrips(request.user.uid, true)
    ]);
    if (activeTrips[0]) {
      throw new ConflictError('You already have an active trip.');
    }
    if (!offer) {
      throw new NotFoundError('This offer does not exist.');
    }
    if (!clientOrder) {
      throw new NotFoundError('This order does not exist.');
    }
    const tripId = await TripRepository.createTrip(
      offer.driver,
      { firstName: request.user.firstName, lastName: request.user.lastName, id: request.user.uid },
      clientOrder.source,
      clientOrder.destination,
      offer.price
    );
    await Promise.all([
      OrderRepository.deleteOrderById(clientOrder.id),
      OfferRepository.deleteOffersByOrderId(clientOrder.id),
      UserRepository.update(request.user.uid, {currentOrder: null})
    ]);

    response.send({id: tripId});
  }

  static async completeTip(request, response) {
    const { tripId } = request.params;
    const trip = await TripRepository.getById(tripId);

    if (!trip) {
      throw new NotFoundError('You do not have active trips now.')
    }
    await TripRepository.updateTrip(tripId, {
      active: false
    });
    response.status(204).send();
  }

  static async getTrips(request, response) {
    const { active, page, size } = request.query;

    response.send(await TripRepository.getTrips(
      request.user,
      active === 'false' ? false : true,
      Number(page),
      Number(size)
    ));
  }

}

module.exports = TripController;
