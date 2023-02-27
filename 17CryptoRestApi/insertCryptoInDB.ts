import { CoinPaprikaObject } from './data/coinpaprika';
import { CoinStatsObject } from './data/coinstats';
import { conn } from './db';
import { getCrypto } from './getCrypto';

export const insertCoinStatsCryptoInDB = async() => {
    const dropTBL = `DELETE FROM crypto.coinstats`;
    conn.query(dropTBL, function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
    });
    const data: CoinStatsObject = await getCrypto('', '', 'coinstats').then(res => res)
    for(const index of data.coins ){
       const sql = `INSERT INTO crypto.coinstats (code, name, symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
        "${index.id}", 
        "${index.name}", 
        "${index.symbol}", 
        ${index.price}, 
        ${index.priceChange1h},
        ${index.priceChange1d}, 
        ${index.priceChange1w}  
       )`;
       conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
      console.log("nice");
      
    }
}
export const insertCoinPaprikaCryptoInDB = async() => {
    const dropTBL = `DELETE FROM crypto.coinpaprika`;
    conn.query(dropTBL, function (err, result) {
        if (err) throw err;
        console.log("Table rows deleted");
    });
    const data: CoinPaprikaObject[] = await getCrypto('', '', 'coinpaprika').then(res => res)
    console.log(typeof data);
    
    for(const index of data ){
       const sql = `INSERT INTO crypto.coinpaprika (code, name, symbol, price, priceChange1h, priceChange1d, priceChange1w ) VALUES (
        "${index.id}", 
        "${index.name}", 
        "${index.symbol}", 
        ${index.quotes.USD.price}, 
        ${index.quotes.USD.percent_change_1h},
        ${index.quotes.USD.percent_change_24h}, 
        ${index.quotes.USD.percent_change_7d}  
       )`;
       conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
      console.log("nice");
      
    }
}