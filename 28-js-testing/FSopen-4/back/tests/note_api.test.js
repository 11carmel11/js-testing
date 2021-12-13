const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const mockData = require("./mockData");
const Blog = require("../models/blog");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(mockData);
  console.log("done");
});

describe("api testing", () => {
  test("server connects", async () => {
    const response = await api.get("/").expect(200);
    expect(response.text).toBe("hello");
  });

  it("should return all blogs", async () => {
    const response = await api.get("/api/blogs").expect(200);
    expect(response.body).toEqual(mockData);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
