const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const blogsRouter = require("./routers/apiBlogRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogsRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

const mongoUrl = process.env.DB;

mongoose.connect(mongoUrl).then(() => {
  console.log("connected to mongo");
});

module.exports = app;
