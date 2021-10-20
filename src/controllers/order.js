const { userRoles } = require('../constants');
const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');
const OrderRepository = require('../repositories/order');
const OfferRepository = require('../repositories/offer');
const TripRepository = require('../repositories/trip');

class OrderController {

  static async deleteOrder(request, response) {
    const { orderId } = request.params;
    const order = await OrderRepository.getClientOrder(request.user.uid);

    if (!order) {
      throw new NotFoundError('This order does not exist.')
    }
    await Promise.all([
      OrderRepository.deleteOrderById(orderId),
      OfferRepository.deleteOffersByOrderId(orderId)
    ]);
    response.status(204).send();
  }

  static async createOrder(request, response) {
    const { source, destination } = request.body;

    if (
      await OrderRepository.getClientOrder(request.user.uid) ||
      (await TripRepository.getTrips(request.user.uid, true))[0]
    ) {
      throw new ConflictError('You already have requested order or active trip.');
    }

    const createdOrderId = await OrderRepository.createOrder(
      {
        id: request.user.user_id,
        firstName: request.user.firstName,
        lastName: request.user.lastName
      },
      source,
      destination
    );
    
    response.send({id: createdOrderId});
  }

  static async getOrders(request, response) {
    const { page, size } = request.query;

    if (request.user.role === userRoles.driver) {
      response.send(await OrderRepository.getAll(Number(page), Number(size)))
    } else {
      response.send(await OrderRepository.getClientOrder(request.user.uid));
    }
  }

}

module.exports = OrderController;
