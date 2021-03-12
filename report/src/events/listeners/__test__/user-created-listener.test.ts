import mongoose from 'mongoose';
import { Message } from "node-nats-streaming";
import { UserCreatedEvent } from "@manthan-practice/common";
import { UserCreatedListener } from "../user-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { User } from "../../../models/user";

const setup = async () => {
  const listener = new UserCreatedListener(natsWrapper.client);
  const data: UserCreatedEvent["data"] = {
    userId: mongoose.Types.ObjectId().toHexString(),
    email: "manthanpl93@live.com",
    version: 0,
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
  const user = await User.findById(data.userId);
  expect(user!.id).toEqual(data.userId);
  expect(user!.email).toEqual(data.email);
});

it("acks the user created event", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
