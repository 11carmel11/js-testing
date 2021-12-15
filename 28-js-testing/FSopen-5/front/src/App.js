import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogsList from "./components/BlogsList";
import Login from "./components/Login";
import getAll from "./services/blogs";
import login from "./services/login";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import logger from "./services/logger";

const notyf = new Notyf({ dismissible: true, duration: 1500 });

const App = () => {
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

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {user ? (
        <BlogsList user={user} list={blogs} />
      ) : (
        <Login setter={changeLoggedUser} />
      )}
    </div>
  );
};

export default App;
