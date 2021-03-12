import { Message } from "node-nats-streaming";
import { TaskCreatedEvent } from "@manthan-practice/common";
import { TaskCreatedListener } from "../task-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { User } from "../../../models/user";
import { Task } from "../../../models/task";
const setup = async () => {
  const listener = new TaskCreatedListener(natsWrapper.client);
  const user = await User.create({
    email: "manthanpl93@live.com",
    version: 0,
  });
  const data: TaskCreatedEvent["data"] = {
    title: "Working On Report",
    description: "Sales report",
    estimation: 5,
    version: 0,
    userId: user.id
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    data,
    msg,
  };
};

it("Listen to user created event", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const tasks = await Task.find({});
  expect(tasks.length).toEqual(1);
  expect(tasks[0].title).toEqual(data.title);
  expect(tasks[0].description).toEqual(data.description);
  expect(String(tasks[0].user)).toEqual(data.userId);
});

it("acks the user created event", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
