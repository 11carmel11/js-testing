const dummy = () => 1;

const totalLikes = (arr) => {
  let count = 0;
  arr.forEach((blog) => {
    count += blog.likes;
  });
  return count;
};

const mostLiked = (arr) => {
  const fav = {
    title: "",
    author: "",
    likes: 0,
  };
  arr.forEach((blog) => {
    if (blog.likes >= fav.likes) {
      fav.title = blog.title;
      fav.likes = blog.likes;
      fav.author = blog.author;
    }
  });
  return fav;
};

const mostBlogs = (arr) => {
  const order = {};
  let final = {
    author: "",
    blogs: 0,
  };
  arr.forEach((blog) => {
    order[blog.author] ? order[blog.author]++ : (order[blog.author] = 1);
  });
  for (const author in order) {
    order[author] >= final.blogs
      ? (final = { blogs: order[author], author })
      : null;
  }
  return final;
};
module.exports = { dummy, totalLikes, mostLiked, mostBlogs };
