const express = require("express");
const { correctarium } = require("./correctarium/index")

const PORT = 5000;

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  let { symbolNumbers, documentType, lang } = req.body;
  let data = correctarium(symbolNumbers, documentType, lang);
  res.status(400).send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
});
