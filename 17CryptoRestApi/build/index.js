"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { apiLinks } from "./data/links";
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = 5050;
app.use(express_1.default.json());
app.get("/getCryptoData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coin, market, period } = req.query;
    console.log(coin);
    let selectRows = "";
    if (market) {
        if (coin) {
            selectRows = `SELECT code, name, symbol, price as Now, 
      (price - (price*priceChange1h)/100) as hourAgo,
      (price - (price*priceChange1d)/100) as dayAgo,
      (price - (price*priceChange1w)/100) as weekAgo 
      FROM crypta 
      where (exchange = "${market}" 
        AND (name = "${coin}" OR symbol = "${coin}"));`;
        }
        else {
            selectRows = `SELECT code, name, symbol, price as Now, 
      (price - (price*priceChange1h)/100) as hourAgo,
      (price - (price*priceChange1d)/100) as dayAgo,
      (price - (price*priceChange1w)/100) as weekAgo 
      FROM crypta 
      where (exchange = "${market}");`;
        }
    }
    else if (coin) {
        console.log(coin);
        selectRows = `SELECT code, name, symbol, price as Now, 
    (price - (price*priceChange1h)/100) as hourAgo,
    (price - (price*priceChange1d)/100) as dayAgo,
    (price - (price*priceChange1w)/100) as weekAgo 
    FROM crypta 
    where (name = "${coin}" OR symbol = "${coin}");`;
    }
    else {
        res.sendStatus(403);
    }
    console.log(selectRows);
    function select() {
        return new Promise((resolve, reject) => {
            db_1.conn.query(selectRows, (err, result /*,field*/) => {
                if (err)
                    return reject(err);
                resolve(Object.values(JSON.parse(JSON.stringify(result))));
            });
        });
    }
    function query() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield select(); // woah, this new await keyword makes life so much easier!
            console.log("Result received:", result);
            return result;
        });
    }
    const respons = yield query();
    res.send(respons);
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on localhost://${PORT}`);
    db_1.conn.connect((err) => {
        if (err)
            throw err;
        console.log("db connected");
    });
    (0, db_1.insertData)();
    setInterval(db_1.insertData, 300000);
}));
