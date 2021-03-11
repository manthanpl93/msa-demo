import {
  UserUnblockedEvent,
  Subjects,
  Listener,
} from "@manthan-practice/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { BlockedUser } from "../../models/blockedUsers";

export class UserUnblockedListener extends Listener<UserUnblockedEvent> {
  readonly subject = Subjects.UserUnblocked;
  queueGroupName = queueGroupName;

  async onMessage(data: UserUnblockedEvent["data"], msg: Message) {
    const blockedUserId = data.userId;
    const blockedUser = await BlockedUser.find({
      userId: blockedUserId,
    });
    if (blockedUser.length) {
      await BlockedUser.deleteOne({
        userId: blockedUserId,
      });
    }
    msg.ack();
  }
}
