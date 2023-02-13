const jwt = require("jsonwebtoken");
const { secret, refreshSecret } = require("../config.js");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "12h" });
};
const generateRefreshToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, refreshSecret, { expiresIn: "12h" });
};
module.exports = { generateAccessToken, generateRefreshToken };
