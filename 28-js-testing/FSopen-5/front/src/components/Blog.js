import React, { useState, useContext } from "react";
import styled from "styled-components";
import like from "../services/like";
import { BlogsSetterContext } from "../App";
import { Notyf } from "notyf";

const notyf = new Notyf({ dismissible: true });

const StyledComp = styled.div`
  border: 3px solid black;
  margin-bottom: 5px;
  display: table;
`;
const Blog = ({ blog, token }) => {
  const [shown, setShown] = useState(false);
  const changeShown = () => setShown(!shown);

  const blogsSetter = useContext(BlogsSetterContext);

  const addLike = async () => {
    try {
      const blogs = await like(blog.id, blog.likes, token);
      blogsSetter(blogs);
      notyf.success("blog has been liked!");
    } catch (error) {}
  };

  return (
    <StyledComp key={blog.id}>
      <div>
        title: <span>{blog.title}</span>
      </div>
      {shown && (
        <main>
          <p>
            url:{" "}
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </p>
          <p>author: {blog.author}</p>
          <p>
            likes: {blog.likes} <button onClick={addLike}>👍</button>
          </p>
        </main>
      )}
      <button onClick={changeShown}>view {shown ? "less" : "more"}</button>
      <br />
    </StyledComp>
  );
};

export default Blog;
