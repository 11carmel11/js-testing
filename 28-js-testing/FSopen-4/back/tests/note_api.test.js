const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const mockData = require("./mockData");
const Blog = require("../models/blog");
const api = supertest(app);
const mockInsertedBlog = {
  title: "test title",
  author: "test author",
  url: "https://www.testurl.com",
  likes: 100,
};
const mockInsertedBlogWithoutLikes = {
  title: "test title",
  author: "test author",
  url: "https://www.testurl.com",
};

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
    const { body } = await api.get("/api/blogs").expect(200);
    expect(JSON.parse(body)).toEqual(
      mockData.map((blog) => {
        const newBlog = { ...blog, id: blog._id };
        delete newBlog._id;
        return newBlog;
      })
    );
  });

  it("should have id property", async () => {
    const { body } = await api.get("/api/blogs").expect(200);
    JSON.parse(body).forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  it("should be able to add blog", async () => {
    await api.post("/api/blogs").send(mockInsertedBlog).expect(201);
    const { body } = await api.get("/api/blogs").expect(200);
    expect(JSON.parse(body)).toHaveLength(mockData.length + 1);
  });

  it("should make default 0 likes if property not provided", async () => {
    await api.post("/api/blogs").send(mockInsertedBlogWithoutLikes).expect(201);
    let { body } = await api.get("/api/blogs").expect(200);
    body = JSON.parse(body);
    const last = body[body.length - 1];
    expect(last.likes).toBeDefined();
    expect(last.likes).toBe(0);
  });

  it("should throw if url || title is not provided", async () => {
    const withoutTitle = (withoutUrl = { ...mockInsertedBlog });
    delete withoutTitle.title;
    delete withoutUrl.url;
    await api.post("/api/blogs").send(withoutTitle).expect(400);
    await api.post("/api/blogs").send(withoutUrl).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
