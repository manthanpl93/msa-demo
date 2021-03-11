import {
  Subjects,
  Publisher,
  UserBlockedEvent,
} from "@manthan-practice/common";

export class UserBlockedPublisher extends Publisher<UserBlockedEvent> {
  readonly subject = Subjects.UserBlocked;
}
