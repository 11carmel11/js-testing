const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const User = require("../../models/user");

module.exports = async (req, _res, next) => {
  const { token } = req;
  try {
    const user = jwt.verify(token, secret);
    const DBUser = await User.findById(user._id);
    req.user = DBUser;
  } catch (error) {
    req.user = "";
  } finally {
    next();
  }
};
