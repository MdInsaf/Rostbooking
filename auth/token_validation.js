const jwt = require("jsonwebtoken");
const blacklist = [];
const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
   
    if (blacklist.includes(token)) {
      return res.status(401).json({
        success: 0,
        message: "Token revoked"
      });
    }
    jwt.verify(token, "qwe1234", (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: 0,
            message: "Token expired"
          });
        } else {
          return res.status(403).json({
            success: 0,
            message: "Invalid token"
          });
        }
      } else {
        const issuedAt = decoded.iat * 1000;
        const currentTime = Date.now();
        const timeSinceIssued = currentTime - issuedAt;
        const tokenExpirationTime = 20 * 60 * 1000;

        if (timeSinceIssued > tokenExpirationTime) {
          return res.status(401).json({
            success: 0,
            message: "Token expired"
          });
        } else {
          next();
        }
      }
    });
  } else {
    return res.status(403).json({
      success: 0,
      message: "Access denied! Unauthorized user"
    });
  }
};

const blacklistToken = (token) => {
  blacklist.push(token);
};

module.exports = { checkToken, blacklistToken };
