const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const mockData = require("./mockDataBlogs");
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
});

describe("api blog testing", () => {
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
    const withoutTitle = { ...mockInsertedBlog },
      withoutUrl = { ...mockInsertedBlog };
    delete withoutTitle.title;
    delete withoutUrl.url;
    await api.post("/api/blogs").send(withoutTitle).expect(400);
    await api.post("/api/blogs").send(withoutUrl).expect(400);
  });

  it("should delete by _id", async () => {
    const { text } = await api
      .delete("/api/blogs/5a422a851b54a676234d17f7")
      .expect(200);
    expect(text).toBe('"deleted"');

    const { body } = await api.get("/api/blogs").expect(200);
    expect(JSON.parse(body)).toHaveLength(5);
  });

  it("should update a property for given id", async () => {
    const { body } = await api
      .patch("/api/blogs/5a422a851b54a676234d17f7?property=likes")
      .send({ updated: 32 })
      .expect(200);

    expect(body).toEqual({ likes: 32 });

    const res = await api.get("/api/blogs").expect(200);
    const arrData = JSON.parse(res.body);
    arrData.forEach((blog) => {
      if (blog._id === "5a422a851b54a676234d17f7") expect(blog.likes).toBe(32);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
