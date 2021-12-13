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

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { property } = req.query;
  const { updated } = req.body;
  await Blog.findByIdAndUpdate(id, { [property]: updated });
  res.json({ [property]: updated });
});

module.exports = router;
