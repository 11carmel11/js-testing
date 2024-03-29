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
