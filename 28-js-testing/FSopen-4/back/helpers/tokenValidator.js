const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
module.exports = (req) => {
  const { authentication } = req.headers;
  const token = authentication.split(" ")[1];
  try {
    const valid = jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};
