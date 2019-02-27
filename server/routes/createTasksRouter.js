const { Router } = require('express');

const createHealthCheckRouter = (Task) => {
  const router = new Router();

  router
    .route('/tasks')
    .post((req, res) => {
      const { body } = req;
      // TODO: Save the task to db
      res
        .status(201)
        .send(body);
    });

  return router;
}

module.exports = createHealthCheckRouter;