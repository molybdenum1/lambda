import express, { Application, Request, Response } from "express";
import { apiLinks } from "./data/links";
import { conn, DropTableData, insertData } from "./db";

const app: Application = express();
const PORT = 5050;

app.use(express.json());
app.get("/insertCryptoData", async (req: Request, res: Response) => {
  // let {coin, market, period} = req.params;
  // let response = []

  res.send();
});

app.listen(PORT, async () => {
  console.log(`Server is running on localhost://${PORT}`);
  conn.connect((err) => {
    if (err) throw err;
    console.log("db connected");
  });
  insertData();
  setInterval(
    insertData
  , 300000)
  
});
