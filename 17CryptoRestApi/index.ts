import express, { Application, Request, Response } from "express";
import { conn, insertData, query } from "./db";

const app: Application = express();
const PORT = 5050;

app.use(express.json());
app.get("/getCryptoData", async (req: Request, res: Response) => {
  const { coin, market } = req.query;
  console.log(coin);

  let selectRows = "";

  if (market) {
    if (coin) {
      selectRows = `SELECT code, name, symbol, exchange, price as Now, 
      priceChange1h as hourAgo,
      priceChange1d as dayAgo,
      priceChange1w as weekAgo 
      FROM crypta 
      where (exchange = "${market}" 
        AND (name = "${coin}" OR symbol = "${coin}"));`;
    } else {
      selectRows = `SELECT code, name, symbol,exchange, price as Now, 
      priceChange1h) as hourAgo,
      priceChange1d as dayAgo,
      priceChange1w as weekAgo 
      FROM crypta 
      where (exchange = "${market}");`;
    }
  } else if (coin) {
    console.log(coin);

    selectRows = `SELECT code, name, symbol, exchange, price as Now, 
    priceChange1h as hourAgo,
    priceChange1d as dayAgo,
    priceChange1w as weekAgo 
    FROM crypta 
    where (name = "${coin}" OR symbol = "${coin}");`;
  } else {
    res.sendStatus(403);
  }
  const respons = await query(selectRows);
  res.send(respons);
});
app.get("/getTopCrypto", async (req: Request, res: Response) => {
  const topCrypto = ["BTC", "ETH", "USDT", "BNB", "DOGE"];
  const cryptoData = topCrypto.map(async (coin) => {
    const selectCrypto = `SELECT code, name, symbol, price as Now, 
    (price - (price*priceChange1h)/100) as hourAgo,
    (price - (price*priceChange1d)/100) as dayAgo,
    (price - (price*priceChange1w)/100) as weekAgo
    FROM crypta where symbol = "${coin}" `;
    return await query(selectCrypto);
  });

  res.send(cryptoData);
});

app.listen(PORT, async () => {
  console.log(`Server is running on localhost://${PORT}`);
  conn.connect((err) => {
    if (err) throw err;
    console.log("db connected");
  });
  insertData();
  setInterval(insertData, 300000);
});
