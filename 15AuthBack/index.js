const express = require('express');
const mongo = require('mongodb');

const PORT = 5000;
const url = `mongodb+srv://molybden:MoWagner@cluster0.dwv8iyf.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.listen(PORT, async () => {
    
    console.log(`Server is running ${PORT} port`);
})