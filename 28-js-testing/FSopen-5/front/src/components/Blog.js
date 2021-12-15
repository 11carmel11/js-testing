import React from "react";
const Blog = ({ blog }) => (
  <section key={blog.id}>
    <div>
      <span>{blog.title}</span>, by <strong>{blog.author}</strong>.
    </div>
    <br />
  </section>
);

export default Blog;
