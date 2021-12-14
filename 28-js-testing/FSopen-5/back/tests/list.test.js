const {
  dummy,
  totalLikes,
  mostLiked,
  mostBlogs,
  mostLikes,
} = require("../helpers/list_helper");
const mockBlogs = require("./mockDataBlogs");

describe("dummy", () => {
  test("dummy should return 1", () => {
    const blogs = [];
    const res = dummy(blogs);
    expect(res).toBe(1);
  });
});

describe("array of blogs - stats", () => {
  it("should return sum of likes in array of blogs", () => {
    const total = totalLikes(mockBlogs);
    const totalOfOne = totalLikes(mockBlogs.slice(0, 1));
    expect(total).toBe(36);
    expect(totalOfOne).toBe(7);
  });

  it("should return most liked blog", () => {
    const mostLikedBlog = mostLiked(mockBlogs);
    expect(mostLikedBlog.likes).toBe(12);
    expect(mostLikedBlog).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  it("should return most blogging author", () => {
    const mostBlogsAuth = mostBlogs(mockBlogs);
    expect(mostBlogsAuth.blogs).toBe(3);
    expect(mostBlogsAuth).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });

  it("should return most liked author", () => {
    const liked = mostLikes(mockBlogs);
    expect(liked.likes).toBe(17);
    expect(liked).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
});
