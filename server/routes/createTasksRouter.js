const { Router } = require('express');

const createHealthCheckRouter = (Task) => {
  const router = new Router();

  router
    .route('/tasks');

  return router;
}

module.exports = createHealthCheckRouter;