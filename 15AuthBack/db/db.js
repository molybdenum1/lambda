const { MongoClient } = require('mongodb');
const { DB_USERNAME, DB_PASSWORD } = require("../config.js");

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.dwv8iyf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

module.exports = client;