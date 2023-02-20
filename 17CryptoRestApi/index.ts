import express, {Application, Request, Response} from 'express';
import { apiLinks } from './data/links';
import { getCrypto } from './getCrypto';

const app: Application = express();
const PORT = 5050;

app.use(express.json());
app.get('/getCrypto', (req: Request, res: Response) => {
    let {coin, market, period} = req.params;
    let response = []
    
    res.send('alal');
})

app.listen(PORT, async () => {
    console.log( await getCrypto('', '', 'cucoin').then(res => res))
    console.log(`Server is running on localhost://${PORT}`);
    
})