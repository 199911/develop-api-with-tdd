const MongooseDriver = require('./drivers/MongooseDriver.js');
const createApp = require('./server/createApp.js');
const TaskFactory = require('./models/TaskFactory.js');

const main = async () => {
  const mongooseDriver = new MongooseDriver({
    debug: false,
    uri: 'mongodb://localhost',
    name: 'todo',
  });
  await mongooseDriver.connectAsync();
  const mongoose = mongooseDriver.getClient();
  // Setup models
  const Task = (new TaskFactory(mongoose)).create();
  // Setup app
  const app = createApp(Task);
  app.listen(3000);
}

main();
