const { uri, resetMongoAsync } = global.mongodb;

const MongooseDriver = require('../MongooseDriver.js');

describe('MongooseDriver', () => {
  let mongooseDriver;
  beforeEach(() => {
    mongooseDriver = new MongooseDriver({
      debug: false,
      uri,
      name: 'driver',
    })
  });

  afterEach(async () => {
    await resetMongoAsync();
  })

  describe('connectAsync()', () => {
    test('should connect to MongoDB without error', async () => {
      const promise = mongooseDriver.connectAsync();
      expect(promise).not.rejects;
    });
    afterEach(async () => {
      mongooseDriver.disconnectAsync();
    });
  });

  describe('when Mongoose driver is connected to database', () => {
    let mongoose;
    beforeEach(async () => {
      mongooseDriver.connectAsync();
      mongoose = mongooseDriver.getClient();
    });
    afterEach(async () => {
      mongooseDriver.disconnectAsync();
    });

    const fixture = { name: 'sunday' };

    test('should be able to use Mongoose to run query', async () => {
      // Save and get object to make sure it works
      const Person = mongoose.model('Person', { name: String });
      const sunday = await Person.create(fixture);
      expect(await Person.findOne(fixture)).toMatchObject(fixture);
    })
  });
});