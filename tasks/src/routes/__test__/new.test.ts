import request from "supertest";
import { app } from "../../app";
import { BlockedUser } from "../../models/blockedUsers";

it("submiting task", async () => {
  await request(app)
    .post("/api/tasks")
    .set("Cookie", await global.signin())
    .send({
      title: "Testing",
      description: "Testing Desc",
      estimation: 10,
    })
    .expect(201);
});

it("submiting task fails when user is blocked", async () => {
  await BlockedUser.create({
    userId: "123",
  });
  await request(app)
    .post("/api/tasks")
    .set("Cookie", await global.signin("123"))
    .send({
      title: "Testing",
      description: "Testing Desc",
      estimation: 10,
    })
    .expect(400);
});
