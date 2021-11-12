exports.userRoles = {
  client: 'client',
  driver: 'driver',
  admin: 'admin'
};

exports.DEFAULT_BACKEND_ERROR_CODE = 500;

exports.databaseCollections = {
  users: 'users',
  orders: 'orders',
  offers: 'offers',
  trips: 'trips',
  reports: 'reports'
};

exports.fromFirebaseErrorToCustom = new Map([
  ['auth/wrong-password', {
    stats: 403,
    message: 'Your password is incorrect.'
  }],
  ['auth/user-not-found', {
    status: 404,
    message: 'Cannot find user with this email.'
  }],
  ['auth/email-already-exists', {
    status: 409,
    message: 'The email address is already in use by another account.'
  }]
]);

exports.acceptedPhotoFormats = ['.JPG', '.jpg', '.JPEG', '.jpeg'];
