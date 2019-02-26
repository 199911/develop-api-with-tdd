const express = require('express');
const createHealthCheckRouter = require('./routes/createHealthCheckRouter.js')

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const healthCheckRoute = createHealthCheckRouter();
  app.use(healthCheckRoute);

  return app;
};

module.exports = createApp;