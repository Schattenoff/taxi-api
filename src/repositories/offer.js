const { firestore } = require('firebase-admin');
const { databaseCollections } = require('../constants');
const { uid } = require('uid');

class OfferRepository {

  static async deleteOffersByOrderId(orderId) {
    const batch = firestore().batch();
    const snapshots = await firestore().collection(databaseCollections.offers)
      .where('orderId', '==', orderId).get();
    snapshots.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }

  static async deleteById(offerId) {
    const snapshot = await firestore().collection(databaseCollections.offers).where('id', '==', offerId).get();
    await snapshot.docs[0]?.ref.delete();
  }

  static async getOffersByDriverId(driverId) {
    const snapshots = await firestore().collection(databaseCollections.offers).where('driver.id', '==', driverId).get();
    return snapshots.docs[0]?.data();
  }

  static async getOfferById(offerId) {
    const snapshots = await firestore().collection(databaseCollections.offers).where('id', '==', offerId).get();
    return snapshots.docs[0]?.data();
  }

  static async getOffersByOrderId(orderId) {
    const snapshots = await firestore().collection(databaseCollections.offers).where('orderId', '==', orderId).get();
    return snapshots.docs.map(snapshot => snapshot.data());
  }

  static async getOffersByDriverId(driverId) {
    const snapshots = await firestore().collection(databaseCollections.offers).where('driver.id', '==', driverId).get();
    return snapshots.docs.map(snapshot => snapshot.data());
  }

  static async createOffer(orderId, driver, price) {
    const offerId = uid(28);

    await firestore()
      .collection(databaseCollections.offers)
      .doc(offerId)
      .set({
        id: offerId,
        orderId,
        driver: {
          car: driver.car,
          id: driver.uid,
          firstName: driver.firstName,
          lastName: driver.lastName
        },
        price,
        createdAt: new Date().valueOf()
      });
    return offerId;
  }

}

module.exports = OfferRepository;
