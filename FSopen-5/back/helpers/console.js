require("dotenv").config();

module.exports = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};
