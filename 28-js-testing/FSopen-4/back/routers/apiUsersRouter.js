const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const salt = Number(process.env.SALT);

router.get("/", async (_req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.post("/", async (req, res) => {
  const { name, username, password } = req.body;
  const user = new User({
    name,
    username,
    password: bcrypt.hashSync(password, salt),
  });
  await User.insertMany([user]);
  res.status(201).json(user);
});

module.exports = router;
