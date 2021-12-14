const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const isTokenValid = require("../helpers/tokenValidator");

router.get("/", async (_req, res) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });

  res.json(blogs);
});

router.post("/", async (req, res) => {
  const { title, url, userId } = req.body;
  if (!title || !url || !userId) {
    res.sendStatus(400);
    return;
  }
  const user = await User.findById(userId);
  const blog = new Blog({ ...req.body, user: user._id });
  const result = await blog.save();
  user.blogs.push(blog._id);
  await user.save();
  res.status(201).json(result);
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
