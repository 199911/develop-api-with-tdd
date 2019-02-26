const { Mongoose } = require('mongoose');

class MongooseDriver {
  constructor({ debug, uri, name }) {
    this.debug = debug;
    this.uri = uri;
    this.name = name;
    this.mongoose = new Mongoose();
  }

  getClient() {
    return this.mongoose;
  }

  connectAsync() {
    this.mongoose.set('debug', this.debug);
    return this.mongoose.connect(
      this.uri,
      {
        keepAlive: true,
        dbName: this.name,
        // The options below is used to remove deprecated warnings from MongoDB 3.6.9
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    );
  }

  disconnectAsync() {
    return this.mongoose.disconnect();
  }
}

module.exports = MongooseDriver;
