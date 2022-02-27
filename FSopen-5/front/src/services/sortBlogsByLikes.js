export default function sortBlogsByLikes(blogA, blogB) {
  return blogB.likes - blogA.likes;
}
