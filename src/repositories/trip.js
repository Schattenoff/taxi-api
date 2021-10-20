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

  static async getTrips(userId, active) {
    const clientTripSnapshot = await firestore().collection(databaseCollections.trips)
      .where('active', '==', active)
      .where('client.id', '==', userId)
      .get();

    if (clientTripSnapshot.docs.length) {
      return clientTripSnapshot.docs.map(snapshot => snapshot.data());
    }

    const driverTripSnapshot = await firestore().collection(databaseCollections.trips)
      .where('active', '==', active)
      .where('driver.id', '==', userId)
      .get();
    
    return driverTripSnapshot.docs.map(snapshot => snapshot.data());
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
