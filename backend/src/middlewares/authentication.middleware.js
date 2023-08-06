const { verifyToken } = require("../helpers/jwt.helper");
const TokenExpiredError = require("jsonwebtoken").TokenExpiredError;
const JsonWebTokenError = require("jsonwebtoken").JsonWebTokenError;

module.exports = async (req, res, next) => {
  //get token from Authorizations header
  const authHeader = req.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  //get the token from header
  const token = authHeader.split(" ")[1];

  //verify the token
  try {
    var decoded = verifyToken(token);
    console.log("Decoded -> ", decoded.username, "Token -> ", token);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(403).json({
        message: "Auth Token expired. Kindly login to get a new token",
      });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
  }

  // pass the username in the req headers
  req.username = decoded.username;

  //call the next
  next();
};
