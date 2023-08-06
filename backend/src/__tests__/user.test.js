const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user.model");
const { createToken } = require("../helpers/jwt.helper");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URL);
});

/* Cleaning && Closing database after each test. */
afterAll(async () => {
  // await User.deleteOne({ username: "LGraham" });
  await mongoose.connection.close();
});

//registering user
describe("POST /register", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/usr/register").send({
      userId: 1,
      username: "LGraham",
      name: "Leanne Graham",
      email: "leanne.graham@gmail.com",
      password: "pass1234",
    });

    expect(res.statusCode).toBe(201);
    expect(res.get("Content-Type")).toContain("application/json");
    expect(res.body).toBeDefined();
  });
});

//login user
describe("POST", () => {
  it("should login a user", async () => {
    const res = await request(app).post("/usr/login").send({
      username: "LGraham",
      password: "pass1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.get("Content-Type")).toContain("application/json");
    expect(res.body).toBeDefined();
  });
});

// //updating user pass
describe("PATCH /:username", () => {
  it("should fail to update user password due to lack of token", async () => {
    const res = await request(app).patch("/usr/LGraham");

    expect(res.statusCode).toBe(401);
    expect(res.get("Content-Type")).toContain("application/json");
    expect(res.body).toBeDefined();
  });

  it("should update user password", async () => {
    // create token
    const payload = {
      iss: "localhost",
      username: "Test User",
    };

    const opts = {
      expiresIn: "3m",
    };

    // signing the token
    const token = createToken(payload, opts);

    const res = await request(app)
      .patch("/usr/1")
      .send({
        username: "LGraham",
        old_password: "leanne.graham@gmail.com",
        new_password: "pass1234",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.get("Content-Type")).toContain("application/json");
    expect(res.body).toEqual({
      message: "User updated successfully",
    });
  });
});

//deleting user
describe("DELETE /:username", () => {
  it("should fail to delete a user due to lack of token", async () => {
    const res = await request(app).delete("/usr/LGraham");

    expect(res.statusCode).toBe(401);
    expect(res.get("Content-Type")).toContain("application/json");
    expect(res.body).toBeDefined();
  });

  it("should delete a user", async () => {
    // create token
    const payload = {
      iss: "localhost",
      username: "Test User",
    };

    const opts = {
      expiresIn: "3m",
    };

    // signing the token
    const token = createToken(payload, opts);

    const res = await request(app)
      .delete("/usr/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.get("Content-Type")).toContain("application/json");
    expect(res.body).toEqual({
      message: "User deleted successfully",
    });
  });
});
