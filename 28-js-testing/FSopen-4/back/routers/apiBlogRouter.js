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
    res.sendStatus(498);
  }
});

router.delete("/:blogId", async (req, res) => {
  const { params, token } = req;
  const { blogId } = params;
  const blog = await Blog.findById(blogId);
  try {
    const user = JSON.parse(jwt.verify(token, secret));
    if (blog.user.toString() !== user._id) return res.sendStatus(403);
    await Blog.findByIdAndRemove(blogId);

    res.json("deleted");
  } catch (error) {
    res.sendStatus(498);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await Blog.findByIdAndUpdate(id, body);
  res.json(body);
});

module.exports = router;
