const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const mockData = require("./mockDataBlogs");
const Blog = require("../models/blog");
const api = supertest(app);
const mock = {
  fullBlog: {
    title: "test title",
    author: "test author",
    url: "https://www.testurl.com",
    likes: 100,
    userId: "61b78093360fdbf65657b86f",
  },
  noLikes: {
    title: "test title",
    author: "test author",
    url: "https://www.testurl.com",
    userId: "61b78093360fdbf65657b86f",
  },
  noTitle: {
    author: "test author",
    url: "https://www.testurl.com",
    likes: 100,
    userId: "61b78093360fdbf65657b86f",
  },
  noUrl: {
    title: "test title",
    author: "test author",
    likes: 100,
    userId: "61b78093360fdbf65657b86f",
  },
  noUserId: {
    title: "test title",
    author: "test author",
    url: "https://www.testurl.com",
    likes: 100,
  },
  userProp: {
    username: "usernameTest2",
    name: "test test2",
    id: "61b78093360fdbf65657b86f",
  },
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(mockData);
});

describe("api blog testing", () => {
  test("server connects", async () => {
    const { text } = await api.get("/").expect(200);
    expect(text).toBe("hello");
  });

  it("should return all blogs", async () => {
    const { body } = await api.get("/api/blogs").expect(200);
    expect(body).toEqual(
      mockData.map((blog) => {
        const newBlog = { ...blog, id: blog._id };
        delete newBlog._id;
        return newBlog;
      })
    );
  });

  it("should have id property instead of _id", async () => {
    const { body } = await api.get("/api/blogs").expect(200);
    body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  it("should be able to add blog", async () => {
    await api.post("/api/blogs").send(mock.fullBlog).expect(201);
    const { body } = await api.get("/api/blogs").expect(200);
    expect(body).toHaveLength(mockData.length + 1);
  });

  it("should make default 0 likes if property not provided", async () => {
    await api.post("/api/blogs").send(mock.noLikes).expect(201);
    const { body } = await api.get("/api/blogs").expect(200);
    const last = body[body.length - 1];
    expect(last.likes).toBeDefined();
    expect(last.likes).toBe(0);
  });

  it("should throw if url || title is not provided", async () => {
    await api.post("/api/blogs").send(mock.noTitle).expect(400);
    await api.post("/api/blogs").send(mock.noUrl).expect(400);
  });

  it("should delete by _id", async () => {
    const { text } = await api
      .delete("/api/blogs/5a422a851b54a676234d17f7")
      .expect(200);
    expect(text).toBe('"deleted"');

    const { body } = await api.get("/api/blogs").expect(200);
    expect(body).toHaveLength(mockData.length - 1);
  });

  it("should update a property for given id", async () => {
    const update = { likes: 32 };
    const { body } = await api
      .patch("/api/blogs/5a422a851b54a676234d17f7")
      .send(update)
      .expect(200);

    expect(body).toEqual(update);

    const res = await api.get("/api/blogs").expect(200);
    const arrData = res.body;
    arrData.forEach((blog) => {
      if (blog._id === "5a422a851b54a676234d17f7") expect(blog.likes).toBe(32);
    });
  });

  it("should be able to connect a blog to a user when created", async () => {
    const { body } = await api
      .post("/api/blogs")
      .send(mock.fullBlog)
      .expect(201);
    expect(body.user).toBe("61b78093360fdbf65657b86f");

    const { body: allBlogs } = await api.get("/api/blogs").expect(200);
    expect(allBlogs[allBlogs.length - 1].user).toEqual(mock.userProp);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
