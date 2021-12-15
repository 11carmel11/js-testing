import React, { useState } from "react";
import styled from "styled-components";
const StyledComp = styled.div`
  border: 3px solid black;
  margin-bottom: 5px;
  display: table;
`;
const Blog = ({ blog }) => {
  const [shown, setShown] = useState(false);
  const changeShown = () => setShown(!shown);

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
            likes: {blog.likes} <button>like</button>
          </p>
        </main>
      )}
      <button onClick={changeShown}>view {shown ? "less" : "more"}</button>
      <br />
    </StyledComp>
  );
};

export default Blog;
