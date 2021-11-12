const { firestore } = require('firebase-admin');
const { databaseCollections } = require('../constants');

class UserRepository {

  static async getAll(page, size) {
    let userSnapshots;

    if (page !== undefined && size) {
      userSnapshots = await firestore().collection(databaseCollections.users)
        .orderBy('createdAt')
        .limit(size)
        .offset(page * size).get();
    } else {
      userSnapshots = await firestore().collection(databaseCollections.users)
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
