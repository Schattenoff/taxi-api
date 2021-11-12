const credentials = require('../credentials.json');
const serviceAccount = require('../service-account.json');
const { initializeApp: initializeAdminApp, cert } = require('firebase-admin/app');
const { initializeApp } = require('firebase/app');
const { firestore } = require('firebase-admin');

exports.init = () => {
  initializeAdminApp({
    credential: cert(serviceAccount),
    storageBucket: credentials.storageBucket
  });
  initializeApp(credentials);
  firestore().settings({ignoreUndefinedProperties: true});

}