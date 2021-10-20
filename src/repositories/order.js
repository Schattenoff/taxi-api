const { firestore } = require('firebase-admin');
const { databaseCollections } = require('../constants');
const { uid } = require('uid');

class OrderRepository {

  static async deleteOrderById(orderId) {
    return await firestore().collection(databaseCollections.orders).doc(orderId).delete();
  }

  static async getClientOrder(clientId) {
    const snapshots = await firestore().collection(databaseCollections.orders).where('client.id', '==', clientId).get();
    
    if (snapshots.docs[0]) {
      return snapshots.docs[0]?.data();
    } else {
      return null;
    }
  }

  static async getById(orderId) {
    const snapshot = await firestore().collection(databaseCollections.orders).where('id', '==', orderId).get();
    return snapshot.docs[0]?.data();
  }

  static async getAll(page, size) {
    let orderSnapshots;

    if (page !== undefined && size) {
      orderSnapshots = await firestore().collection(databaseCollections.orders).orderBy('createdAt')
      .limit(size)
      .offset(page * size).get();
    } else {
      orderSnapshots = await firestore().collection(databaseCollections.orders).orderBy('createdAt').get();
    }

    return orderSnapshots.docs.map(snapshot => snapshot.data());
  }

  static async createOrder(client, source, destination) {
    const orderId = uid(28);

    await firestore()
      .collection(databaseCollections.orders)
      .doc(orderId)
      .set({
        id: orderId,
        client,
        source,
        destination,
        createdAt: new Date().valueOf()
      });
    return orderId;
  }

}

module.exports = OrderRepository;
