import {
  Subjects,
  Publisher,
  TaskCreatedEvent
} from "@manthan-practice/common";

export class TaskCreatedPublisher extends Publisher<TaskCreatedEvent> {
  readonly subject = Subjects.TaskCreated;
}
