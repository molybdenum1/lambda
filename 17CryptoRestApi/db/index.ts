import mysql from "mysql";
import {
  insertCoinMarketCryptoInDB,
  insertCoinPaprikaCryptoInDB,
  insertCoinStatsCryptoInDB,
  insertCuCryptoInDB,
} from "../insertCryptoInDB";

export const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  // database: 'cryptoDB'
});

export const DropTableData = () => {
  const dropTBL = `DELETE FROM crypto.crypta`;
  conn.query(dropTBL, function (err, result) {
    if (err) throw err;
    console.log("Table rows deleted");
  });
};

export const insertData = async () => {
  DropTableData()
  await insertCoinStatsCryptoInDB();
  await insertCoinPaprikaCryptoInDB();
  await insertCuCryptoInDB();
  await insertCoinMarketCryptoInDB();
};
