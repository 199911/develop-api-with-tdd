const { Router } = require('express');

const createHealthCheckRouter = () => {
  const router = new Router();

  router
    .route('/')
    .get((req, res) => {
      res.send('Hello World');
    });

  return router;
}

module.exports = createHealthCheckRouter;