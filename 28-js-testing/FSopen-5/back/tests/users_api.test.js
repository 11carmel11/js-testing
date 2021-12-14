const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const mockData = require("./mockDataUsers");
const User = require("../models/user");
const api = supertest(app);
const userMockInsert = {
  username: "mosheG",
  password: "moshemoshe",
  name: "moshe",
};

const badUserMockInsert = {
  username: "mo",
  password: "mo",
  name: "moshe",
};

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(mockData);
});

describe("api users test", () => {
  test("server connects", async () => {
    const response = await api.get("/").expect(200);
    expect(response.text).toBe("hello");
  });

  it("should return all users", async () => {
    const { body } = await api.get("/api/users").expect(200);
    for (let i = 0; i < body.length; i++) {
      expect(body[i].name).toBe(mockData[i].name);
    }
  });

  it("should be possible to add user", async () => {
    await api.post("/api/users").send(userMockInsert).expect(201);
    const { body } = await api.get("/api/users").expect(200);
    expect(body).toHaveLength(3);
  });

  it("should be impossible to break the user rules", async () => {
    await api.post("/api/users").send(badUserMockInsert).expect(400);
    const { body } = await api.get("/api/users").expect(200);
    expect(body).toHaveLength(2);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
