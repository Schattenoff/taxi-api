const userRoute = require('../routes/user');
const authRoute = require('../routes/auth');
const orderRoute = require('../routes/order');
const offerRoute = require('../routes/offer');
const tripRoute = require('../routes/trip');
const reportRoute = require('../routes/report');

module.exports = (expressApp) => {
  expressApp
    .use(authRoute)
    .use('/user', userRoute)
    .use('/order', orderRoute)
    .use('/offer', offerRoute)
    .use('/trip', tripRoute)
    .use('/report', reportRoute);
}
