import React, { useState, useEffect } from "react";
import BlogsList from "./components/BlogsList";
import Login from "./components/Login";
import deleteBlog from "./services/deleteBlog";
import pushNewBlog from "./services/create";
import logger from "./services/logger";
import getAll from "./services/getAll";
import login from "./services/login";
import like from "./services/like";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({ dismissible: true, duration: 1500 });

export const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");

  const changeLoggedUser = async (username, password) => {
    if (!username || !password) return;
    try {
      const token = await login(username, password);
      localStorage.setItem("username", username);
      setUser(token);
    } catch (error) {
      logger(error);
      notyf.error(error.response.data);
    }
  };

  const addLike = async (blog) => {
    try {
      const newBlogs = await like(blog);
      setBlogs(newBlogs);
      notyf.success("blog has been liked!");
    } catch (error) {
      notyf.error("Oops, something went wrong. Please try again");
    }
  };

  const removeBlog = async (blog) => {
    try {
      const isSure = window.confirm("Are you sure you want to delete blog?");
      if (!isSure) return;
      const blogs = await deleteBlog(blog.id, user);
      setBlogs(blogs);
      notyf.success("blog has been deleted");
    } catch (error) {
      logger(error);
      notyf.error("process has failed. try again and we'll try our best!");
    }
  };

  const createBlog = async (title, author, url) => {
    try {
      if (!url || !author || !url) return;
      const newList = await pushNewBlog(title, author, url, user);
      setBlogs(newList);
      notyf.success("your blog has been added!");
    } catch (error) {
      logger(error);
      notyf.error("Oops, it seems like something went wrong... ");
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUser("");
  };

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {user ? (
        <BlogsList
          list={blogs}
          likeHandler={addLike}
          remover={removeBlog}
          creator={createBlog}
          logoutHandler={logout}
        />
      ) : (
        <Login setter={changeLoggedUser} />
      )}
    </div>
  );
};
