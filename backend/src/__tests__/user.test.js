const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {

  await mongoose.connection.close();
});

//registering user
describe("POST /register", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/register").send({
      userId: 1,
      username: "LGraham",
      name: "Leanne Graham",
      email: "leanne.graham@gmail.com",
      password: "pass1234",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body).toEqual({message: "Successfully registered user", status: "Created"})
  });
});

//login user
describe("POST /:id", () => {
  it("should login a user", async () => {
    const res = await request(app).post("/login").send({
      username: "LGraham",
      email: "leanne.graham@gmail.com",
      password: "pass1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body).toEqual({message: "Successfully logged in", status: "OK"})
  });
})

//updating user pass
describe("PATCH /:id", () => {
  it("should update user password", async () => {
    const res = await request(app).patch("/1").send({
      username: "LGraham",
      old_password: "leanne.graham@gmail.com",
      new_password: "pass1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body).toEqual({message: "Successfully updated password", status: "OK"})
  });
})

//deleting user
describe("DELETE /:id", () => {
  it("should delete a user", async () => {
    const res = await request(app).delete("/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body).toEqual({message: "Successfully deleted user", status: "OK"})
  });
})