const express = require("express");
const { PORTIK } = require("./config.js");
const authRouter = require("./routes/authRouter");
const client = require("./db/db");

const PORT = PORTIK || 5000;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.listen(PORT, async () => {
  await client.connect();
  console.log(`Server is running ${PORT} port`);
});
