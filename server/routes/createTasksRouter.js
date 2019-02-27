const { Router } = require('express');

const createHealthCheckRouter = (Task) => {
  const router = new Router();

  router
    .route('/tasks')
    .post(async (req, res, next) => {
      const { body } = req;
      let newTask;
      try {
        newTask = await Task.create(body);
      } catch (err) {
        next(err);
      }
      res
        .status(201)
        .send(newTask);
    });

  return router;
}

module.exports = createHealthCheckRouter;