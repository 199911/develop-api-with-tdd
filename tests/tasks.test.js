const request = require('supertest');
const { resetMongoAsync, uri } = global.mongodb;

const MongooseDriver = require('../drivers/MongooseDriver.js');
const createApp = require('../server/createApp.js');
const TaskFactory = require('../models/TaskFactory.js');

describe('Tasks API', () => {
  let mongoose;
  let Task;
  let app;
  // Set up mongoose
  beforeEach(async () => {
    const mongooseDriver = new MongooseDriver({
      debug: false,
      uri,
      name: 'jest',
    });
    await mongooseDriver.connectAsync();
    mongoose = mongooseDriver.getClient();
  });
  // Setup models
  beforeEach(() => {
    Task = (new TaskFactory(mongoose)).create();
  });
  // Setup app
  beforeEach(() => {
    app = createApp(Task);
  })

  afterEach(async () => {
    await resetMongoAsync();
  });

  test('should do something', async () => {
  });
});