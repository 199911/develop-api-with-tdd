const request = require('supertest');
const { resetMongoAsync, uri } = global.mongodb;

const MongooseDriver = require('../drivers/MongooseDriver.js');
const createApp = require('../server/createApp.js');

describe('Tasks API', () => {
  let mongoose;
  let app;
  beforeEach(async () => {
    const mongooseDriver = new MongooseDriver({
      debug: false,
      uri,
      name: 'jest',
    });
    await mongooseDriver.connectAsync();
    mongoose = mongooseDriver.getClient();
    app = createApp();
  });
  afterEach(async () => {
    await resetMongoAsync();
  });

  test('should do something', async () => {
  });
});