const OfferRepository = require('../repositories/offer');
const OrderRepository = require('../repositories/order');
const ConflictError = require('../errors/conflict');
const NotFoundError = require('../errors/not-found');
const ValidationEntityError = require('../errors/validation')
const { userRoles } = require('../constants');
const ValidationError = require('../errors/validation');

class OfferController {

  static async deleteOffer(request, response) {
    const { offerId } = request.params;
    const offer = await OfferRepository.getOfferById(offerId);

    if (!offer) {
      throw new NotFoundError('This offer does not exist.');
    }

    await OfferRepository.deleteById(offerId)
    response.status(204).send();
  }

  static async getOffers(request, response) {
    if (request.user.role === userRoles.client) {
      await OfferController.getOrderOffers(request, response);
    } else {
      await OfferController.getDriverOffers(request, response);
    }
  }

  static async getDriverOffers(request, response) {
    response.send(await OfferRepository.getOffersByDriverId(request.user.uid));
  }

  static async getOrderOffers(request, response) {
    const { orderId } = request.query;

    if (!orderId) {
      throw new ValidationError('Order ID is required!')
    }

    response.send(await OfferRepository.getOffersByOrderId(orderId));
  }

  static async createOffer(request, response) {
    const { orderId, price } = request.body;
    const driverOffers = await OfferRepository.getOffersByDriverId(request.user.uid);
    const order = await OrderRepository.getById(orderId);

    if (!order) {
      throw NotFoundError('This order does not exist.');
    }
    if (driverOffers.some(offer => offer.orderId === orderId)) {
      throw new ConflictError('You already offered this order.');
    }

    const offerId = await OfferRepository.createOffer(
      orderId,
      request.user,
      price
    );
    response.send({id: offerId});
  }

}

module.exports = OfferController;
