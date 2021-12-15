import Blog from "./Blog";

export default function BlogsList({ list }) {
  const username = localStorage.getItem("username");
  return (
    <div>
      <h2>blogs:</h2>
      <h3>{username} is logged in</h3>
      {list.sort().map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
