import {
  Subjects,
  Publisher,
  UserCreatedEvent
} from "@manthan-practice/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
}
