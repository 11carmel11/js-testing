import React, { useState } from "react";
import styled from "styled-components";
import RemoveBtn from "./RemoveBtn";
import PropTypes from "prop-types";

const StyledComp = styled.div`
  border: 3px solid black;
  margin-bottom: 5px;
  display: table;
`;

export default function Blog({ blog, username, likeHandler, remover }) {
  const [shown, setShown] = useState(false);
  const changeShown = () => setShown(!shown);

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
            likes: {blog.likes}{" "}
            <button
              className="like-btn"
              onClick={() => {
                likeHandler(blog);
              }}
            >
              👍
            </button>
          </p>
          {username === blog.user.username && (
            <RemoveBtn
              remover={() => {
                remover(blog);
              }}
            />
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
