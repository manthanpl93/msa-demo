import request from "supertest";
import { app } from "../../app";
import { Task } from "../../models/task";
import { User } from "../../models/user";

it("Report data show", async () => {
  const user = await User.create({
    email: "manthanpl93@live.com",
    version: 0,
  });
  await Task.create({
    title: "Working On Report",
    description: "Sales report",
    estimation: 5,
    version: 0,
    user,
  });

  await Task.create({
    title: "Working On Report 2",
    description: "Sales report",
    estimation: 5,
    version: 0,
    user,
  });

  const response = await request(app)
    .get("/api/report")
    .set("Cookie", await global.signin())
    .expect(201);
  expect(response.body.length).toEqual(2);
});
