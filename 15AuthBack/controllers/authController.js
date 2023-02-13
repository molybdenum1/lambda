const jwt = require("jsonwebtoken");
const { secret, refreshSecret } = require("../config.js");
const client = require("../db/db");
const { generateAccessToken, generateRefreshToken } = require("../jwt");

class AuthController {
  async getUsers(req, res) {
    let userToken = req.headers.authorization.split(" ")[1];
    if (!userToken) {
      return res.status(400).json({ message: "Error in token" });
    }
    jwt.verify(userToken, secret);
    let i = req.params.id;
    let users = await client.db("test").collection("users").find().toArray();
    if (!users[i]) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    return res.send(users[i]);
  }
  async signUp(req, res) {
    try {
      // console.log( req.body);
      const { username, password } = req.body;
      const candidate = await client
        .db("test")
        .collection("users")
        .findOne({ username: username });
      if (candidate) {
        return res.status(400).json({ message: "User is exist" });
      }
      await client
        .db("test")
        .collection("users")
        .insertOne({ username, password });
      return res.json({ message: "User succsesfully registrate" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async login(req, res) {
    try {
      // console.log(req.query);
      const { username, password } = req.query;
      const user = await client
        .db("test")
        .collection("users")
        .findOne({ username: username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} doesn't exist.` });
      }
      if (password !== user.password) {
        return res.status(400).json({ message: `Not valid password` });
      }
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      return res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async refresh(req, res) {
    try {
      let userToken = req.headers.authorization.split(" ")[1];
      if (!userToken) {
        return res.status(400).json({ message: "Error in token" });
      }
      let { refreshToken, username, password } = req.body;
      const user = await client
        .db("test")
        .collection("users")
        .findOne({ username: username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} doesn't exist.` });
      }
      // / Destructuring refreshToken from cookie
      // Verifying refresh token
      jwt.verify(refreshToken, refreshSecret, (err, decoded) => {
        if (err) {
          return res.status(406).json({ message: "Unauthorized" });
        } else {
          // Correct token we send a new access token
          const accessToken = generateAccessToken(user._id);
          return res.json({ accessToken });
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
module.exports = new AuthController();
