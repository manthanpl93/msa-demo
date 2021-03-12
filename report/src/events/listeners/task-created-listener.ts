import { TaskCreatedEvent, Subjects, Listener } from "@manthan-practice/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Task } from "../../models/task";
import { User } from "../../models/user";
export class TaskCreatedListener extends Listener<TaskCreatedEvent> {
  readonly subject = Subjects.TaskCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TaskCreatedEvent["data"], msg: Message) {
    const user = await User.findById(data.userId);
    await Task.create({
      title: data.title,
      description: data.description,
      estimation: data.estimation,
      version: data.version,
      user,
    });
    msg.ack();
  }
}
