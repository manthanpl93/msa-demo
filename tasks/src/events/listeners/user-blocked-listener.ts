import { UserBlockedEvent, Subjects, Listener } from "@manthan-practice/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { BlockedUser } from "../../models/blockedUsers";

export class UserBlockedListener extends Listener<UserBlockedEvent> {
  readonly subject = Subjects.UserBlocked;
  queueGroupName = queueGroupName;

  async onMessage(data: UserBlockedEvent["data"], msg: Message) {
    const blockedUserId = data.userId;
    const blockedUser = await BlockedUser.find({
      userId: blockedUserId,
    });
    if (blockedUser.length == 0) {
      await BlockedUser.create({ userId: blockedUserId });
    }
    msg.ack();
  }
}
