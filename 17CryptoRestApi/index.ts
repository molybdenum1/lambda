import express, { Application, Request, Response } from "express";
import { apiLinks } from "./data/links";
import { conn } from "./db";
import { insertCoinPaprikaCryptoInDB, insertCoinStatsCryptoInDB } from "./insertCryptoInDB";

const app: Application = express();
const PORT = 5050;

app.use(express.json());
app.get("/insertCryptoData", async (req: Request, res: Response) => {
  // let {coin, market, period} = req.params;
  // let response = []

  res.send();
});

app.listen(PORT, async () => {
  conn.connect((err) => {
    if (err) throw err;
    console.log("db connected");
  });
//   insertCoinStatsCryptoInDB();
//   insertCoinPaprikaCryptoInDB();
  console.log(`Server is running on localhost://${PORT}`);
});
