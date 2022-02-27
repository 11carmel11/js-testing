const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const User = require("../../models/user");

module.exports = async (req, _res, next) => {
  const { token } = req;
  try {
    const user = jwt.verify(token, secret);
    /** minor bug ->
     * some users uses _id and some id,
     * depends on when they where inserted to DB.
     * older users uses _id.
     * newer uses id, like wanted
     */
    const DBUser = await User.findById(user._id || user.id);
    req.user = DBUser;
  } catch (error) {
    req.user = "";
  } finally {
    next();
  }
};
