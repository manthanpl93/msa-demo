import request from "supertest";
import { app } from "../../app";
it("block user if user is not blocked", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const userId = response.body.id;
  await request(app)
    .post(`/api/users/block`)
    .send({
      userId: userId,
      status: "blocked",
    })
    .expect(201);
});

it("block user fails if user already blocked", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const userId = response.body.id;

  await request(app)
    .post(`/api/users/block`)
    .send({
      userId,
      status: "blocked",
    })
    .expect(201);

  await request(app)
    .post(`/api/users/block`)
    .send({
      userId: userId,
      status: "blocked",
    })
    .expect(400);
});

it("blocked event sent", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const userId = response.body.id;
  await request(app)
    .post(`/api/users/block`)
    .send({
      userId,
      status: "blocked",
    })
    .expect(201);
});

it("unblock user if user is not blocked", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const userId = response.body.id;
  await request(app)
    .post(`/api/users/block`)
    .send({
      userId,
      status: "blocked",
    })
    .expect(201);

  await request(app)
    .post(`/api/users/block`)
    .send({
      userId,
      status: "unblocked",
    })
    .expect(201);
});
