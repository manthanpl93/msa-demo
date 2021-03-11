import { Message } from "node-nats-streaming";
import { UserBlockedEvent } from "@manthan-practice/common";
import { UserBlockedListener } from "../user-blocked-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { BlockedUser } from "../../../models/blockedUsers";

const setup = async () => {
  const listener = new UserBlockedListener(natsWrapper.client);
  const data: UserBlockedEvent["data"] = {
    userId: "1234",
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

it("Listen to user blocked event", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const user = await BlockedUser.find({
    userId: "1234",
  });
  expect(user[0].userId).toEqual(data.userId);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
