const jwt = require("jsonwebtoken");
const { secret } = require("../config.js");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "12h" });
};
module.exports = { generateAccessToken };
