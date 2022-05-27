const ReportRepository = require('../repositories/report');
const TripRepository = require('../repositories/trip');
const UserRepository = require('../repositories/user');

class ReportController {

  static async getAll(request, response) {
    const { page, size } = request.query;
  
    response.send(await ReportRepository.getAll(Number(page), Number(size)));
  }

  static async create(request, response) {
    const { driverId, tripId, comment } = request.body;
    const driver = await UserRepository.getUserById(driverId);

    await Promise.all([
      TripRepository.updateTrip(tripId, {report: comment}),
      ReportRepository.create({driver, comment})
    ]);
    response.status(204).send();
  }

}

module.exports = ReportController;
