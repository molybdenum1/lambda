const jwt = require("jsonwebtoken");
const { secret } = require("../config");

//middleware function to check that user authorized
module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "User is unauthorized 1" });
    }
    const decodedData = jwt.verify(token, secret);
    req.users = decodedData;
    next();
  } catch (error) {
    return res.status(403).json({ message: "User is unauthorized" });
  }
};
