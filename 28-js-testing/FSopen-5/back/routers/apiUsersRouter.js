const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const salt = Number(process.env.SALT);
const secret = process.env.SECRET;

router.get("/", async (_req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get("/login", async (req, res) => {
  const { username, password } = req.query;
  const user = await User.findOne({ username });
  if (!user) return res.sendStatus(404);
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(JSON.stringify(user), secret);
    res.json(token);
  } else res.sendStatus(401);
});

router.post("/", async (req, res) => {
  const { name, username, password } = req.body;
  if (password.length < 3) {
    return res.sendStatus(400);
  }
  try {
    const user = new User({
      name,
      username,
      password: bcrypt.hashSync(password, salt),
    });
    await User.insertMany([user]);
    res.status(201).json(user);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
