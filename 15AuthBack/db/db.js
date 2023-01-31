const { MongoClient, Db } = require('mongodb');
const url = `mongodb+srv://molybden:MoWagner@cluster0.dwv8iyf.mongodb.net/?retryWrites=true&w=majority`;
const defDbName = 'auth-db'

const client = new MongoClient(url, {useUnifiedTopology: true});

let db = new Db(client, defDbName)
module.exports.db = db 

const connect = async (dbName =defDbName) => {
  try {
    await client.connect();
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports.connect = connect