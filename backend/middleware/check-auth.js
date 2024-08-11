const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "here_is_temporary_secret");
    req.userData = { mail: decodedToken.mail, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
