import express from 'express';
import { correctarium } from './part1/index.js';

const PORT = 5000;

const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    let {symbolNumbers, documentType, lang} = req.body;
    let a = correctarium(symbolNumbers, documentType, lang)
    res.status(400).send(a)
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port.`);
})