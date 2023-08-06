const jwt = require("jsonwebtoken");

const createToken = (payload, options) => {
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const verifyToken = (token) => {
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded -> ", decoded);
  return decoded;
};

module.exports = { createToken, verifyToken };
