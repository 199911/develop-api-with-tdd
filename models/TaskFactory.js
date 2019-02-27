class TaskModelFactory {
  constructor(mongoose) {
    this.mongoose = mongoose;
  }

  create() {
    const { Schema } = this.mongoose;
    const taskSchema = new Schema({
      name: String,
      description: String,
      isDone: Boolean,
    });
    return this.mongoose.model('Tasks', taskSchema);
  }
}

module.exports = TaskModelFactory;
