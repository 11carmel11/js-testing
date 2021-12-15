import Blog from "./Blog";
import Logout from "./Logout";

export default function BlogsList({ list, setter }) {
  const username = localStorage.getItem("username");
  const logout = () => {
    localStorage.removeItem("username");
    setter("");
  };
  return (
    <div>
      <h2>blogs:</h2>
      <h3>{username} is logged in</h3>
      <Logout logoutHandler={logout}>click to logout</Logout>
      {list.sort().map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
