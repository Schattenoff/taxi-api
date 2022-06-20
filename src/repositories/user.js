const { firestore } = require('firebase-admin');
const { databaseCollections } = require('../constants');

class UserRepository {

  static async getAll(page, size, role) {
    let userSnapshots;

    if (page !== undefined && size) {
      const total = (await firestore().collection(databaseCollections.users)
        .where('role', '==', role)
        .orderBy('createdAt')
        .get()).size;

      userSnapshots = await firestore().collection(databaseCollections.users)
        .where('role', '==', role)
        .orderBy('createdAt')
        .limit(size)
        .offset(page * size).get();

      return {
        items: userSnapshots.docs.map(snapshot => snapshot.data()),
        total
      };
    } else {
      userSnapshots = await firestore().collection(databaseCollections.users)
        .where('role', '==', role)
        .orderBy('createdAt')
        .get();
    }

    return userSnapshots.docs.map(snapshot => snapshot.data());
  }

  static async update(userId, user) {
    await firestore().collection(databaseCollections.users)
      .doc(userId)
      .set(user, {merge: true});
  }

  static async getUserById(userId) {
    const snapshot = await firestore()
      .collection(databaseCollections.users)
      .doc(userId)
      .get();

    return snapshot.data();
  }

  static async createUser(id, email, role, firstName, lastName, car) {
    return firestore()
      .collection(databaseCollections.users)
      .doc(id)
      .set({
        id,
        email,
        role,
        firstName,
        lastName,
        car,
        createdAt: new Date().valueOf()
      });
  }

}

module.exports = UserRepository;
