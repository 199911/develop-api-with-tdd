const express = require('express');
const createHealthCheckRouter = require('./routes/createHealthCheckRouter.js')
const createTasksRouter = require('./routes/createTasksRouter.js')

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const healthCheckRoute = createHealthCheckRouter();
  app.use(healthCheckRoute);

  const tasksRouter = createTasksRouter();
  app.use(tasksRouter);

  return app;
};

module.exports = createApp;