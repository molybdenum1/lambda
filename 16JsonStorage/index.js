const express = require('express');
const mainRouter = require('./routes/mainRouter');

const PORT = 5000;

const app = express();

app.use(express.json());
app.use("/data", mainRouter)

app.listen(PORT, async() => {
    console.log(`Server is running ${PORT}`);
})