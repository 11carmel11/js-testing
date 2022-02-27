import React from "react";
import Blog from "./Blog";
import Creator from "./Creator";
import Logout from "./Logout";
import sortBlogsByLikes from "../services/sortBlogsByLikes";

export default function BlogsList({
  list,
  likeHandler,
  remover,
  creator,
  logoutHandler,
}) {
  const username = localStorage.getItem("username");

  const Header = () => (
    <div>
      <h2>blogs:</h2>
      <h3>{username} is logged in</h3>
      <Logout logoutHandler={logoutHandler} />
      <Creator createHandler={creator} />
    </div>
  );

  return (
    <div>
      <Header />
      {list.sort(sortBlogsByLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          username={username}
          likeHandler={likeHandler}
          remover={remover}
        />
      ))}
    </div>
  );
}
