const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const log = require("./helpers/console");
// const Blog = require("./models/blog");

const app = express();
const blogsRouter = require("./routers/apiBlogRouter");
const userRouter = require("./routers/apiUsersRouter");
const tokenExtract = require("./routers/middleware/tokenExtract");
const userExtract = require("./routers/middleware/userExtract");

const mongoUrl =
  process.env.NODE_ENV !== "test" ? process.env.DB : process.env.DB_TEST;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(tokenExtract);
app.use(userExtract);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

const connect = async () => {
  await mongoose.connect(mongoUrl);
  log("connected to mongo");
};
connect();
module.exports = app;
