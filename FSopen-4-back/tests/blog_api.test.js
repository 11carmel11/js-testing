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
  tokenHeader: {
    authorization:
      "bearer eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MWI3ODA5MzM2MGZkYmY2NTY1N2I4NmYiLCJ1c2VybmFtZSI6InVzZXJuYW1lVGVzdDIiLCJwYXNzd29yZCI6IiQyYSQxMCRRLnZXU3RFaXQuN1RsZGFNV1RzcFZPYTRna0ZLWXkwYjR6RmlHRGUxV0RDNThoUTVyamt2dSIsIm5hbWUiOiJ0ZXN0IHRlc3QyIiwiX192IjowfQ.OgetrGwWwncps_LH1-JG9aOfXyTI8UEKunLWDMVkidQ",
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
    await api
      .post("/api/blogs")
      .set(mock.tokenHeader)
      .send(mock.fullBlog)
      .expect(201);
    const { body } = await api.get("/api/blogs").expect(200);
    expect(body).toHaveLength(mockData.length + 1);
  });

  it("should make default 0 likes if property not provided", async () => {
    await api
      .post("/api/blogs")
      .set(mock.tokenHeader)
      .send(mock.noLikes)
      .expect(201);
    const { body } = await api.get("/api/blogs").expect(200);
    const last = body[body.length - 1];
    expect(last.likes).toBeDefined();
    expect(last.likes).toBe(0);
  });

  it("should throw when authorization token is missing", async () => {
    await api.post("/api/blogs").send(mock.fullBlog).expect(498);

    await api.delete("/api/blogs/5a422a851b54a676234d17f7").expect(498);
  });

  it("should throw if url || title is not provided when creating a blog", async () => {
    await api
      .post("/api/blogs")
      .set(mock.tokenHeader)
      .send(mock.noTitle)
      .expect(400);

    await api
      .post("/api/blogs")
      .set(mock.tokenHeader)
      .send(mock.noUrl)
      .expect(400);
  });

  it("should delete by _id", async () => {
    const { body } = await api
      .post("/api/blogs")
      .set(mock.tokenHeader)
      .send(mock.fullBlog)
      .expect(201);

    const { text } = await api
      .delete(`/api/blogs/${body.id}`)
      .set(mock.tokenHeader)
      .expect(200);
    expect(text).toBe('"deleted"');

    const res = await api.get("/api/blogs").expect(200);
    expect(res.body).toHaveLength(mockData.length);
  });

  it("should update a property for given id", async () => {
    const response = await api
      .post("/api/blogs")
      .set(mock.tokenHeader)
      .send(mock.fullBlog)
      .expect(201);

    const update = { likes: 32 };
    const { body } = await api
      .patch(`/api/blogs/${response.body.id}`)
      .set(mock.tokenHeader)
      .send(update)
      .expect(200);

    expect(body).toEqual(update);

    const res = await api.get("/api/blogs").expect(200);
    const arrData = res.body;
    arrData.forEach((blog) => {
      if (blog._id === response.body.id.toString()) expect(blog.likes).toBe(32);
    });
  });

  it("should be able to connect a blog to a user when created", async () => {
    const { body } = await api
      .post("/api/blogs")
      .set(mock.tokenHeader)
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
