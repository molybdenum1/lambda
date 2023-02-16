import express, {Application} from 'express';

const app: Application = express();
const PORT: Number = 5050;


app.listen(PORT, () => {
    console.log(`Server is running on localhost://${PORT}`);
    
})