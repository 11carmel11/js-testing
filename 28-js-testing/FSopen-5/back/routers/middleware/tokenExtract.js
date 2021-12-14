module.exports = (req, _res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  req.token = token || "";
  next();
};
