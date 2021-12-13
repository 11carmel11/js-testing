const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (_req, res) => {
  const blogs = await Blog.find({});

  res.json(JSON.stringify(blogs));
});

router.post("/", async (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    res.sendStatus(400);
    return;
  }
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndRemove(id);
  res.json("deleted");
});

module.exports = router;
