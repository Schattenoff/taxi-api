const { firestore } = require('firebase-admin');
const { databaseCollections } = require('../constants');
const { uid } = require('uid');

class ReportRepository {

  static async getAll(page, size) {
    let reportSnapshots;

    if (page !== undefined && size) {
      reportSnapshots = await firestore().collection(databaseCollections.reports)
        .orderBy('createdAt')
        .limit(size)
        .offset(page * size)
        .get();
    } else {
      reportSnapshots = await firestore().collection(databaseCollections.reports)
        .orderBy('createdAt')
        .get();
    }

    return reportSnapshots.docs.map(snapshot => snapshot.data());
  }

  static async create(report) {
    const reportId = uid(28);
    
    await firestore().collection(databaseCollections.reports).doc(reportId).set({
      ...report,
      id: reportId,
      createdAt: new Date().valueOf()
    });
  }

}

module.exports = ReportRepository;
