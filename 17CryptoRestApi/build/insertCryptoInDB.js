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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCoinMarketCryptoInDB = exports.insertCuCryptoInDB = exports.insertCoinPaprikaCryptoInDB = exports.insertCoinStatsCryptoInDB = void 0;
const db_1 = require("./db");
const getCrypto_1 = require("./getCrypto");
const insertCoinStatsCryptoInDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, getCrypto_1.getCrypto)('', '', 'coinstats').then(res => res);
    for (const index of data.coins) {
        const sql = `INSERT INTO crypta (code, name, exchange, symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
        "${index.id}", 
        "${index.name}", 
        "coinstats", 
        "${index.symbol}", 
        ${index.price}, 
        ${index.priceChange1h},
        ${index.priceChange1d}, 
        ${index.priceChange1w}  
       )`;
        db_1.conn.query(sql, function (err) {
            if (err)
                throw err;
        });
    }
    console.log("CoinStats here");
});
exports.insertCoinStatsCryptoInDB = insertCoinStatsCryptoInDB;
const insertCoinPaprikaCryptoInDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, getCrypto_1.getCrypto)('', '', 'coinpaprika').then(res => res);
    // console.log(typeof data );
    for (const index of data) {
        const sql = `INSERT INTO crypta (code, name, exchange, symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
        "${index.id}", 
        "${index.name}",
        "coinpaprika",  
        "${index.symbol}", 
        ${index.quotes.USD.price}, 
        ${index.quotes.USD.percent_change_1h},
        ${index.quotes.USD.percent_change_24h}, 
        ${index.quotes.USD.percent_change_7d}  
       )`;
        db_1.conn.query(sql, function (err) {
            if (err)
                throw err;
        });
    }
    console.log("Coin Paprika here");
});
exports.insertCoinPaprikaCryptoInDB = insertCoinPaprikaCryptoInDB;
const insertCuCryptoInDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, getCrypto_1.getCrypto)('', '', 'cucoin').then(res => res);
    // console.log(typeof data );
    for (const index of data.data.ticker) {
        const sql = `INSERT INTO crypto.crypta (code, name, exchange,symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
      "${index.symbol}", 
      "${index.symbolName}", 
      "cucoin", 
      "${index.symbol} ", 
      ${index.buy || 0}, 
      ${index.last || 0},
      ${index.low}, 
      ${index.high}  
     )`;
        db_1.conn.query(sql, function (err) {
            if (err)
                throw err;
        });
    }
    console.log("Cucoin Here");
});
exports.insertCuCryptoInDB = insertCuCryptoInDB;
const insertCoinMarketCryptoInDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, getCrypto_1.getCrypto)('', '', 'coinmarketcap').then(res => res);
    // console.log(typeof data );
    for (const index of data.data) {
        const sql = `INSERT INTO crypta (code, name, exchange, symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
      "${index.slug}", 
      "${index.name}", 
      "coinmarketcap", 
      "${index.symbol}", 
      ${index.quote.USD.price}, 
      ${index.quote.USD.percent_change_1h},
      ${index.quote.USD.percent_change_24h}, 
      ${index.quote.USD.percent_change_7d}  
     )`;
        db_1.conn.query(sql, function (err) {
            if (err)
                throw err;
        });
    }
    console.log("Coin Market Cap here");
});
exports.insertCoinMarketCryptoInDB = insertCoinMarketCryptoInDB;
// export const insertCoinBaseCryptoInDB = async() => {
//   const dropTBL = `DELETE FROM crypto.crypta`;
//   conn.query(dropTBL, function (err, result) {
//       if (err) throw err;
//       console.log("Table deleted");
//   });
//   const data: CoinStatsObject = await getCrypto('', '', 'coinstats').then(res => res)
//   for(const index of data.coins ){
//      const sql = `INSERT INTO crypto.crypta (code, name, exchange, symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
//       "${index.id}", 
//       "${index.name}", 
//       "coinstats", 
//       "${index.symbol}", 
//       ${index.price}, 
//       ${index.priceChange1h},
//       ${index.priceChange1d}, 
//       ${index.priceChange1w}  
//      )`;
//      conn.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
//     console.log("nice");
//   }
// }
