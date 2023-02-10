const express = require("express");
const jwt = require("jsonwebtoken");
const { DB_PASSWORD, DB_USERNAME, PORTIK, secret } = require("./config.js");
// const mongo = require('mongodb');
const { MongoClient } = require("mongodb");
const { generateAccessToken } = require("./jwt");

const PORT = PORTIK || 5000;
const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.dwv8iyf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

const app = express();
app.use(express.json());

app.get("/:id", async (req, res) => {
  let userToken = req.headers.authorization.split(" ")[1]
  if(!userToken) {
    return res.status(400).json({ message: "Error in token" });
  }
  jwt.verify(userToken, secret)
  let i = req.params.id;
  let users = await client.db("test").collection("users").find().toArray();
  res.send(users[i]);
});
app.post("/sign_up", async (req, res) => {
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
});
app.post("/login", async (req, res) => {
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
    const token = generateAccessToken(user._id);
    return res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, async () => {
  await client.connect();
  console.log(`Server is running ${PORT} port`);
});
