import React, { useState, useEffect, createContext } from "react";
import BlogsList from "./components/BlogsList";
import Login from "./components/Login";
import getAll from "./services/getAll";
import login from "./services/login";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import logger from "./services/logger";

const notyf = new Notyf({ dismissible: true, duration: 1500 });

export const BlogsSetterContext = createContext(null);

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

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <BlogsSetterContext.Provider value={setBlogs}>
        {user ? (
          <BlogsList userSetter={setUser} list={blogs} user={user} />
        ) : (
          <Login setter={changeLoggedUser} />
        )}
      </BlogsSetterContext.Provider>
    </div>
  );
};
