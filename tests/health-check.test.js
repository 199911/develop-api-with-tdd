const request = require('supertest');

const createApp = require('../server/createApp.js');

describe('Health check API', () => {
  let app;
  beforeEach(() => {
    app = createApp();
  });

  test('should give 200 response', async () => {
    await request(app)
      .get('/')
      .expect(200);
  });
});