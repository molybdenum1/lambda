import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { Crypto } from "./src/intefaces/crypto.interface";

const token = '5891307863:AAHaiPlgVoTSKgsH6tLNGYdMlp8ppKKpEyY'

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.text);
    
    if (msg.text?.toString().toLowerCase() === "hi") {
        bot.sendMessage(chatId,`Hello dear ${msg.chat.first_name}`);
    }
    // bot.sendMessage(chatId, 'Received your message');
});


bot.on('message', async(msg: any) => {

    const chatId = msg.chat.id;
    const getData: Crypto[]  = await (await axios.get('http://localhost:5050/getCryptoData?coin=BTC')).data
    const ans = getData.map(coin => {
       return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`
    })
    
    if (msg.text?.toString().toLowerCase() === "bitoc") {
        bot.sendMessage(chatId, ans.join('\n') );
        // console.log(getData);
    }
    
});