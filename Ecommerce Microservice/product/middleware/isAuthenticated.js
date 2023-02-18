const jwt = require("jsonwebtoken");
module.exports.isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    next();
  });
};
