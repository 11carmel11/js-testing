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
  //#region setup
  //#endregion

  it("should render generic blog", () => {
    //#region setup
    const mockLiker = jest.fn();
    const mockRemover = jest.fn();
    const component = render(
      <Blog
        blog={mock.fullBlog}
        username={mock.user.username}
        likeHandler={mockLiker}
        remover={mockRemover}
      />
    );
    //#endregion

    const title = component.getByText(`title: ${mock.fullBlog.title}`);
    const author = component.getByText(`author: ${mock.fullBlog.author}`);
    const viewBtn = component.getByText("view more");
    const url = component.container.querySelector(".url");
    expect(author).toBeDefined();
    expect(viewBtn).toBeDefined();
    expect(title).toBeDefined();
    expect(url).toEqual(null);
  });

  it("should show all details when clicking on `view more`", () => {
    //#region setup
    const mockLiker = jest.fn();
    const mockRemover = jest.fn();
    const component = render(
      <Blog
        blog={mock.fullBlog}
        username={mock.user.username}
        likeHandler={mockLiker}
        remover={mockRemover}
      />
    );
    //#endregion

    const viewBtn = component.container.querySelector(".view-btn");
    expect(viewBtn).toBeDefined();

    fireEvent.click(viewBtn);

    const url = component.container.querySelectorAll(".url");
    expect(url).toHaveLength(1);
  });

  it("should add like when clicking", () => {
    //#region setup
    const mockLiker = jest.fn();
    const mockRemover = jest.fn();
    const component = render(
      <Blog
        blog={mock.fullBlog}
        username={mock.user.username}
        likeHandler={mockLiker}
        remover={mockRemover}
      />
    );
    //#endregion

    const viewBtn = component.container.querySelector(".view-btn");
    expect(viewBtn).not.toEqual(null);

    fireEvent.click(viewBtn);

    const likeBtn = component.container.querySelector(".like-btn");
    expect(likeBtn).not.toEqual(null);

    for (let i = 1; i < 5; i++) {
      fireEvent.click(likeBtn);

      expect(mockLiker.mock.calls).toHaveLength(i);
    }
  });
});
