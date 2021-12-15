import sortBlogsByLikes from "../services/sortBlogsByLikes";
import Blog from "./Blog";
import Creator from "./Creator";
import Logout from "./Logout";

export default function BlogsList({ list, userSetter, user }) {
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.removeItem("username");
    userSetter("");
  };

  const Header = () => (
    <div>
      <h2>blogs:</h2>
      <h3>{username} is logged in</h3>
      <Logout logoutHandler={logout}>click to logout</Logout>
      <Creator token={user} />
    </div>
  );

  return (
    <div>
      <Header />
      {list.sort(sortBlogsByLikes).map((blog) => (
        <Blog key={blog.id} blog={blog} token={user} />
      ))}
    </div>
  );
}
