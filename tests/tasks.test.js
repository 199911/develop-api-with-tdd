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

  describe('POST /tasks', () => {
    test('should return the task created', async () => {
      const fixture = {
        name: 'Prepare demo',
        description: 'For Show me the code #9',
      }
      const {body} = await request(app)
        .post('/tasks')
        .send(fixture)
        .expect(201);
      expect(body).toMatchObject(fixture);
    });
  });

  describe('GET /tasks', () => {
    test('should return the task created', async () => {
      const {body} = await request(app)
        .get('/tasks')
        .expect(200);
      expect(body).toEqual([]);
    });
  });
});