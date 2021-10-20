const app = require('express')();

const initExpress = require('./loaders/express');
const initRoutes = require('./loaders/routes');
const initMiddlewares = require('./loaders/middlewares');
const cors = require('./middlewares/cors');

exports.start = () => {
  initExpress(app);
  app.use(cors);
  initRoutes(app);
  initMiddlewares(app);
  app.listen(3000, () => console.log('Server is running on the port 3000'));
}
