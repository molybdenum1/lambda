import { Database } from "sqlite3";

export const db = new Database("./db/user.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

export const getDataFromDb = (sql: string) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  });
};
