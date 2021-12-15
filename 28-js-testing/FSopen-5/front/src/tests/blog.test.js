import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "../components/Blog";

const mock = {
  fullBlog: {
    id: "61b9c591a06f89dc6fbccd3a",
    title: "test title",
    author: "test author",
    url: "https://www.testurl.com",
    likes: 100,
    user: {
      username: "usernameTest2",
      name: "test test2",
      id: "61b78093360fdbf65657b86f",
    },
  },
  user: {
    username: "usernameTest2",
    name: "test test2",
    id: "61b78093360fdbf65657b86f",
  },
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lVGVzdDIiLCJuYW1lIjoidGVzdCB0ZXN0MiIsInBhc3N3b3JkIjoiJDJiJDEwJFlUSDZqNFNpblBIb0lIRzRqOEN2aS5GbC5HUUZqeFNIOFpxLmdZNEF2bElCUHVXTU41WE1TIiwiYmxvZ3MiOlsiNjFiOTA0N2Q2MWQ2MjM1M2NkNjNjZDI1IiwiNjFiOTA0N2U2MWQ2MjM1M2NkNjNjZDMzIiwiNjFiOTA0ODA2MWQ2MjM1M2NkNjNjZDUzIiwiNjFiOTA0ODI2MWQ2MjM1M2NkNjNjZDYzIiwiNjFiOTA0ODQ2MWQ2MjM1M2NkNjNjZDc0Il0sImlkIjoiNjFiNzgwOTMzNjBmZGJmNjU2NTdiODZmIn0.UsO2MF25IuIdqAhN3d604PF8rMWt7LU3v249ChLFwQI",
};

describe("<Blog/> Component", () => {
  let component;

  beforeEach(() => {
    component = render(
      <Blog
        blog={mock.fullBlog}
        username={mock.fullBlog.author}
        token={mock.token}
      />
    );
  });

  it("should render generic blog", () => {
    const title = component.getByText(`title: ${mock.fullBlog.title}`);
    const author = component.getByText(`author: ${mock.fullBlog.author}`);
    const viewBtn = component.getByText("view more");
    const url = component.container.querySelectorAll(".url");
    expect(author).toBeDefined();
    expect(viewBtn).toBeDefined();
    expect(title).toBeDefined();
    expect(url).toHaveLength(0);
  });

  it("should show all details onClick on button", () => {
    const viewBtn = component.queryByText("view more");
    const hideBtn = component.queryByText("view less");

    expect(viewBtn).toBeDefined();
    expect(hideBtn).toBeNull();

    fireEvent.click(viewBtn);

    expect(hideBtn).toBeDefined();
  });
});
