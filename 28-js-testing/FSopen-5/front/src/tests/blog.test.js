import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "../components/Blog";

it("should render generic blog", () => {
  const blog = {
    title: "title test",
    author: "author test",
    url: "http:/url test",
    likes: 32,
  };

  const component = render(<Blog blog={blog} />);

  const title = component.getByText("title: title test");
  const author = component.getByText("author: author test");
  const showBtn = component.getByText("view more");
  const url = component.container.querySelectorAll(".url");
  expect(author).toBeDefined();
  expect(showBtn).toBeDefined();
  expect(title).toBeDefined();
  expect(url).toHaveLength(0);
});
