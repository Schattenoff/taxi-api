const app = require('express')();

const initExpress = require('./loaders/express');
const initRoutes = require('./loaders/routes');
const initMiddlewares = require('./loaders/middlewares');
const cors = require('./middlewares/cors');
const port = process.env.PORT || 3000;

exports.start = () => {
  initExpress(app);
  app.use(cors);
  initRoutes(app);
  initMiddlewares(app);
  app.listen(port, () => console.log(`Server is running on the port ${port}`));
}
