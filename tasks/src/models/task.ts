import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties
// that are requried to create a new Task
interface TaskAttrs {
  title: string;
  description: string;
  estimation: number;
  userId: string;
}

// An interface that describes the properties
// that a Task Model has
interface TaskModel extends mongoose.Model<TaskDoc> {
  build(attrs: TaskAttrs): TaskDoc;
}

// An interface that describes the properties
// that a Task Document has
interface TaskDoc extends mongoose.Document {
  title: string;
  description: string;
  estimation: number;
  version: number;
  userId: string;
}

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    estimation: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

TaskSchema.set("versionKey", "version");
TaskSchema.plugin(updateIfCurrentPlugin);

TaskSchema.statics.build = (attrs: TaskAttrs) => {
  return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>("Task", TaskSchema);

export { Task };
