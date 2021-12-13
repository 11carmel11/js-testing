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
module.exports = { dummy, totalLikes, mostLiked };
