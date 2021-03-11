import {
  Subjects,
  Publisher,
  UserUnblockedEvent,
} from "@manthan-practice/common";

export class UserUnblockedPublisher extends Publisher<UserUnblockedEvent> {
  readonly subject = Subjects.UserUnblocked;
}
