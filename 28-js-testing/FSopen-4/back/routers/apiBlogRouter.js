const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Blog = require("../models/blog");
const User = require("../models/user");
const secret = process.env.SECRET;

router.get("/", async (_req, res) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });

  res.json(blogs);
});

router.post("/", async (req, res) => {
  const { token, body, token } = req;
  const { title, url } = body;
  if (!title || !url || !token) return res.sendStatus(400);
  try {
    const payload = JSON.parse(jwt.verify(token, secret));
    const user = await User.findOne({ username: payload.username });

    const blog = new Blog({ ...req.body, user: user._id });
    const result = await blog.save();

    user.blogs.push(blog._id);
    await user.save();
    res.status(201).json(result);
  } catch (error) {
    return res.sendStatus(498);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndRemove(id);
  res.json("deleted");
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await Blog.findByIdAndUpdate(id, body);
  res.json(body);
});

module.exports = router;
