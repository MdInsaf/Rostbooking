module.exports = {
  checkToken: (req, res, next) => {
    next(); // No token validation, directly pass to next middleware
  }
};
