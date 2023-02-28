import express, { Application, Request, Response } from "express";
// import { apiLinks } from "./data/links";
import { conn, insertData } from "./db";

const app: Application = express();
const PORT = 5050;

app.use(express.json());
app.get("/getCryptoData", async (req: Request, res: Response) => {
  const { coin, market, period } = req.query;
  // console.log(req.query);

  let selectRows = ""; 

  if (market) {
    if (coin) {
      selectRows = `SELECT code, name, symbol, price as Now, 
      (price - (price*priceChange1h)/100) as hourAgo,
      (price - (price*priceChange1d)/100) as dayAgo,
      (price - (price*priceChange1w)/100) as weekAgo 
      FROM crypto.crypta 
      where (exchange = "${market}" 
        AND (name = "${coin}" OR symbol = "${coin}"));`;
    } else {
      selectRows = `SELECT code, name, symbol, price as Now, 
      (price - (price*priceChange1h)/100) as hourAgo,
      (price - (price*priceChange1d)/100) as dayAgo,
      (price - (price*priceChange1w)/100) as weekAgo 
      FROM crypto.crypta 
      where (exchange = "${market}");`;
    }
  } else if (coin) {
    selectRows = `SELECT code, name, symbol, price as Now, 
    (price - (price*priceChange1h)/100) as hourAgo,
    (price - (price*priceChange1d)/100) as dayAgo,
    (price - (price*priceChange1w)/100) as weekAgo 
    FROM crypto.crypta 
    where (name = "${coin}" OR symbol = "${coin}");`;
  } else {
    res.sendStatus(403);
  }
 
  function select() {
    return new Promise((resolve, reject) => {
      conn.query(selectRows, (err, result /*,field*/) => {
        if(err) return reject(err);
        resolve(Object.values(JSON.parse(JSON.stringify(result))));
      });
    });
  }
  async function query() {
    const result = await select(); // woah, this new await keyword makes life so much easier!
    // console.log("Result received:", result);
    return result
  }
  const respons = await query();

  res.send(respons);
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
