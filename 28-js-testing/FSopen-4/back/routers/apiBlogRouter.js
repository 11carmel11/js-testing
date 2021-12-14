const router = require("express").Router();
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
const Blog = require("../models/blog");
// const User = require("../models/user");
// const secret = process.env.SECRET;

router.get("/", async (_req, res) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });

  res.json(blogs);
});

router.post("/", async (req, res) => {
  const { user, body } = req;
  if (!user) return res.sendStatus(498);

  const { title, url } = body;
  if (!title || !url) return res.sendStatus(400);

  const blog = new Blog({ ...req.body, user: user._id });
  const result = await blog.save();

  user.blogs.push(blog._id);
  await user.save();
  res.status(201).json(result);
});

router.delete("/:blogId", async (req, res) => {
  const { params, user } = req;
  if (!user) return res.sendStatus(498);

  const { blogId } = params;
  if (!blogId) return res.sendStatus(400);

  const blog = await Blog.findById(blogId);

  if (blog.user.toString() !== user.id) return res.sendStatus(401);

  await Blog.findByIdAndRemove(blogId);
  res.json("deleted");
});

router.patch("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const { body, user } = req;
  const blog = await Blog.findById(blogId);

  if (user.id !== blog.user.toString()) return res.sendStatus(401);
  await Blog.findByIdAndUpdate(blogId, body);
  res.json(body);
});

module.exports = router;
