const server = require('./server');
const firebase = require('./firebase');
const Mailer = require('./mailer');

Mailer.init();
firebase.init();
server.start();
