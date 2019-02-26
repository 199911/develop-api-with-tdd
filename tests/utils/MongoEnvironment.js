const NodeEnvironment = require('jest-environment-node');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

class MongoEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.options = config.testEnvironmentOptions;
  }

  async setup() {
    // Setup MongoDB server
    this.mongod = new MongoMemoryServer({
      autoStart: false,
    });
    if (!this.mongod.isRunning) {
      await this.mongod.start();
    }

    // this.global will become the Gloabl object in jest test script
    // Global variable is the only way to pass object from test envirnoment
    const uri = await this.mongod.getConnectionString();
    const name = 'jest';
    this.global.mongodb = {
      uri,
      resetMongoAsync: async () => {
        const connection = await MongoClient.connect(uri, { useNewUrlParser: true });
        const db = await connection.db(name);
        // NOTICE: DANGEROUS! Don't run this on any real server
        await db.dropDatabase();
        await connection.close();
      },
    };

    await super.setup();
  }

  async teardown() {
    this.mongod.stop();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
