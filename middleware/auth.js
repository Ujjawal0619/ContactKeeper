const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if token not exist
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user; // store to access user id stored in payload for further operations in other routes.
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
