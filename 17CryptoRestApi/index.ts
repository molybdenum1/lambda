import express, {Application} from 'express';

const app: Application = express();
const PORT = 5050;


app.listen(PORT, () => {
    console.log(`Server is running on localhost://${PORT}`);
    
})