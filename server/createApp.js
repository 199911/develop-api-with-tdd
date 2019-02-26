const express = require('express');

const createApp = () => {
  const app = express();

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};

module.exports = createApp;