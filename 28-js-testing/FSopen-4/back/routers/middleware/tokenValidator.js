module.exports = (req, _res, next) => {
  const { authentication } = req.headers;
  const token = authentication?.split(" ")[1];
  req.token = token;
  next();
};
