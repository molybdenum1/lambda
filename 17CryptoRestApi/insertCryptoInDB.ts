import { CoinMarketCapObject } from './data/coinmarketcap';
import { CoinPaprikaObject } from './data/coinpaprika';
import { CoinStatsObject } from './data/coinstats';
import { CucoinObject } from './data/cucoin';
import { conn } from './db';
import { getCrypto } from './getCrypto';

export const insertCoinStatsCryptoInDB = async() => {
    const data: CoinStatsObject = await getCrypto('', '', 'coinstats').then(res => res)
    for(const index of data.coins ){
       const sql = `INSERT INTO crypto.crypta (code, name, exchange, symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
        "${index.id}", 
        "${index.name}", 
        "coinstats", 
        "${index.symbol}", 
        ${index.price}, 
        ${index.priceChange1h},
        ${index.priceChange1d}, 
        ${index.priceChange1w}  
       )`;
       conn.query(sql, function (err) {
        if (err) throw err;
      });
    }
    console.log("CoinStats here");
}
export const insertCoinPaprikaCryptoInDB = async() => {
    const data: CoinPaprikaObject[] = await getCrypto('', '', 'coinpaprika').then(res => res)
    // console.log(typeof data );
    
    for(const index of data ){
       const sql = `INSERT INTO crypto.crypta (code, name, exchange, symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
        "${index.id}", 
        "${index.name}",
        "coinpaprika",  
        "${index.symbol}", 
        ${index.quotes.USD.price}, 
        ${index.quotes.USD.percent_change_1h},
        ${index.quotes.USD.percent_change_24h}, 
        ${index.quotes.USD.percent_change_7d}  
       )`;
       conn.query(sql, function (err) {
        if (err) throw err;
      });
    }
    console.log("Coin Paprika here");
}
export const insertCuCryptoInDB = async() => {
  const data: CucoinObject = await getCrypto('', '', 'cucoin').then(res => res)
  // console.log(typeof data );
  
  for(const index of data.data.ticker ){
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
     conn.query(sql, function (err) {
      if (err) throw err;
      
    });
  }
  console.log("Cucoin Here");
}
export const insertCoinMarketCryptoInDB = async() => {
  
  const data: CoinMarketCapObject = await getCrypto('', '', 'coinmarketcap').then(res => res)
  // console.log(typeof data );
  
  for(const index of data.data ){
     const sql = `INSERT INTO crypto.crypta (code, name, exchange, symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
      "${index.slug}", 
      "${index.name}", 
      "coinmarketcap", 
      "${index.symbol}", 
      ${index.quote.USD.price}, 
      ${index.quote.USD.percent_change_1h},
      ${index.quote.USD.percent_change_24h}, 
      ${index.quote.USD.percent_change_7d}  
     )`;
     conn.query(sql, function (err) {
      if (err) throw err;
      
    });
  }
  console.log("Coin Market Cap here");
}
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