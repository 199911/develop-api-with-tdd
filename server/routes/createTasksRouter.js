const { Router } = require('express');

const createHealthCheckRouter = () => {
  const router = new Router();

  router
    .route('/tasks');

  return router;
}

module.exports = createHealthCheckRouter;