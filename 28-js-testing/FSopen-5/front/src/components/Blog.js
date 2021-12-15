import React, { useState, useContext } from "react";
import styled from "styled-components";
import like from "../services/like";
import { BlogsSetterContext } from "../App";
import { Notyf } from "notyf";
import RemoveBtn from "./RemoveBtn";
import PropTypes from "prop-types";

const notyf = new Notyf({ dismissible: true });

const StyledComp = styled.div`
  border: 3px solid black;
  margin-bottom: 5px;
  display: table;
`;

export default function Blog({ blog, token, username }) {
  const [shown, setShown] = useState(false);
  const changeShown = () => setShown(!shown);

  const blogsSetter = useContext(BlogsSetterContext);

  const addLike = async () => {
    try {
      const blogs = await like(blog.id, blog.likes, token);
      blogsSetter(blogs);
      notyf.success("blog has been liked!");
    } catch (error) {
      notyf.error("Oops, something went wrong. Please try again");
    }
  };

  return (
    <StyledComp key={blog.id}>
      <div>
        <p className="title">title: {blog.title}</p>
        <p className="author">author: {blog.author}</p>
      </div>
      {shown && (
        <main>
          <p className="url">url: {blog.url}</p>
          <p className="likes">
            likes: {blog.likes} <button onClick={addLike}>👍</button>
          </p>
          {username === blog.user.username && (
            <RemoveBtn blog={blog} token={token} />
          )}
        </main>
      )}
      <button className="view-btn" onClick={changeShown}>
        view {shown ? "less" : "more"}
      </button>
      <br />
    </StyledComp>
  );
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
