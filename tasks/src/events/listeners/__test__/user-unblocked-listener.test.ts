import { Message } from "node-nats-streaming";
import { UserUnblockedEvent } from "@manthan-practice/common";
import { UserUnblockedListener } from "../user-unblocked-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { BlockedUser } from "../../../models/blockedUsers";

const setup = async () => {
  const listener = new UserUnblockedListener(natsWrapper.client);
  const data: UserUnblockedEvent["data"] = {
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

it("Listen to user unblocked event", async () => {
  const { listener, data, msg } = await setup();
  await BlockedUser.create({ userId: data.userId });
  await listener.onMessage(data, msg);
  const user = await BlockedUser.find({
    userId: data.userId,
  });
  expect(user.length).toEqual(0);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
