import mysql from "mysql";
import {
  insertCoinMarketCryptoInDB,
  insertCoinPaprikaCryptoInDB,
  insertCoinStatsCryptoInDB,
  insertCuCryptoInDB,
} from "../insertCryptoInDB";

export const conn = mysql.createConnection({
  // host: "us-cdbr-east-06.cleardb.net",
  // user: "b1f3ae1edcd7a4",
  // password: "173030a1",
  host: "localhost",
  user: "root",
  password: "",
  database: "crypto"
  // database: 'heroku_5f2d735c3a54dd8'
});

export const DropTableData = async () => {
  const dropTBL = `DELETE FROM crypta;`;
  await conn.query(dropTBL, function (err, result) {
    if (err) throw err;
    console.log("Table rows deleted");
  });
};
export const AlterTableData = async () => {
  const alterTBL = `ALTER TABLE crypta AUTO_INCREMENT = 0;`;
  await conn.query(alterTBL, function (err, result) {
    if (err) throw err;
    console.log("Table rows index reserted");
  });
};

export const SelectTopCrypto = async () => {
  const selectTop = ``
}
export function select(selectRows: string) {
  return new Promise((resolve, reject) => {
    conn.query(selectRows, (err, result /*,field*/) => {
      if(err) return reject(err);
      resolve(Object.values(JSON.parse(JSON.stringify(result))));
    });
  });
}
export async function query(selectRows: string) {
  const result = await select(selectRows); // woah, this new await keyword makes life so much easier!
  // console.log("Result received:", result);
  return result;
}


export const insertData = async () => {
  console.log('++++++++++++++++++++++++++++');  
  await DropTableData();
  await AlterTableData();
  await insertCoinStatsCryptoInDB();
  await insertCoinPaprikaCryptoInDB();
  await insertCuCryptoInDB();
  await insertCoinMarketCryptoInDB();
  console.log('++++++++++++++++++++++++++++');

};
