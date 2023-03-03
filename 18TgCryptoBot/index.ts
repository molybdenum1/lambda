import TelegramBot from "node-telegram-bot-api";
import CryptoService from "./service/crypto.service";
import { Crypto } from "./src/intefaces/crypto.interface";

const token = '5891307863:AAHaiPlgVoTSKgsH6tLNGYdMlp8ppKKpEyY'

const bot = new TelegramBot(token, {polling: true});
const cryptpService = new CryptoService()

bot.onText(/\/start/i, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,`Hello dear ${msg.chat.first_name}`, {
        "reply_markup": {
            "keyboard" : [[{text: 'Hi'}]] 
        }
    });
    
});

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
    let cmd, crypta;
    msg.text.split(' ').length > 1? [cmd, crypta] = msg.text.split(' '): cmd = msg.text;
    if(cmd.toString().toLowerCase() === 'crypta' || 'crypto'){
        const getData: Crypto[]  = await (await axios.get(`http://localhost:5050/getCryptoData?coin=${crypta}`)).data
        if(crypta){
            const ans = [' NAME | SYMBOL | PRICE NOW | PRICE HOUR AGO \n', ...getData.map(coin => {
                return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`
            })]
            bot.sendMessage(chatId, ans.join('\n') );
        } else {
            bot.sendMessage(chatId, 'No such coin name or symbol');
        }
    }
    

    if (msg.text?.toString().toLowerCase() === "bitoc") {
        const chatId = msg.chat.id;
        const getData: Crypto[]  = await ().data
        const ans = getData.map(coin => {
           return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`
        })
        bot.sendMessage(chatId, ans.join('\n') );
        // console.log(getData);
    } 
});

bot.on("message", async(msg: any) => {

   

});