const express = require('express');
// const mongo = require('mongodb');
const { MongoClient } = require('mongodb');

const PORT = 5000;
const url = `mongodb+srv://molybden:MoWagner@cluster0.dwv8iyf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url)

const app = express();
app.get('/', async (req, res) => {
    let users = await client.db("test").collection("users").find().toArray()
    res.send(users)
})

app.listen(PORT, async () => {
    await client.connect()
    // databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    

    // client.db
    console.log(`Server is running ${PORT} port`);
})