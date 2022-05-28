const { firestore } = require('firebase-admin');
const { databaseCollections } = require('../constants');
const { uid } = require('uid');

class TripRepository {

  static async getById(tripId) {
    const snapshot = await firestore().collection(databaseCollections.trips).doc(tripId).get();
    return snapshot.data();
  }

  static async updateTrip(tripId, trip) {
    await firestore().collection(databaseCollections.trips).doc(tripId).update(trip);
  }

  static async getTrips(user, active, page, size) {
    if (page !== undefined && size) {
      const total = (await firestore().collection(databaseCollections.trips)
        .where('active', '==', active)
        .where(`${user.role}.id`, '==', user.uid)
        .get()).size;
      const tripSnapshot = await firestore().collection(databaseCollections.trips)
        .where('active', '==', active)
        .where(`${user.role}.id`, '==', user.uid)
        .orderBy('createdAt')
        .limit(size)
        .offset(page * size)
        .get();
      const items = tripSnapshot.docs.map(snapshot => snapshot.data());

      return {
        total,
        items
      };
    } else {
      const tripSnapshot = await firestore().collection(databaseCollections.trips)
        .where('active', '==', active)
        .where(`${user.role}.id`, '==', user.uid)
        .orderBy('createdAt')
        .get();

      return tripSnapshot.docs.map(snapshot => snapshot.data());
    }
  }

  static async createTrip(driver, client, source, destination, price) {
    const tripId = uid(28);
    
    await firestore().collection(databaseCollections.trips).doc(tripId).set({
      id: tripId,
      driver,
      client,
      source,
      destination,
      price,
      active: true,
      createdAt: new Date().valueOf()
    });
    return tripId;
  }

}

module.exports = TripRepository;
