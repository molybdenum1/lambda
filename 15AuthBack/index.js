const express = require('express');
const mongo = require('mongodb');
const db = require('./db/db')

const PORT = 5000;

const app = express();
app.get('/', async(req, res) => {
    await db.db.collection('users').find({}).toArray(function(err, result){
        if(err){
            res.status(400).send('error fetching')
        }else {
            res.json(result)
        }
    })
} );


db.connect()



app.listen(PORT, async () => {
    
    console.log(`Server is running ${PORT} port`);
})