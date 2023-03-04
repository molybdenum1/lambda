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
            "keyboard" : [[{text: 'Top'}, ]] 
        }
    });
    
});


bot.on('message', async(msg: any) => {
    
    const chatId = msg.chat.id;
    let cmd, crypta;
    msg.text.split(' ').length > 1? [cmd, crypta] = msg.text.split(' '): cmd = msg.text;
    if(cmd.toString().toLowerCase() === ('crypta' || 'crypto')){
        const getData: Crypto[]  = await (cryptpService.getCryptoByName(crypta))
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
        const getData: Crypto[]  = await (cryptpService.getCryptoByName('BTC'));
        const ans = getData.map(coin => {
           return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`
        })
        bot.sendMessage(chatId, ans.join('\n') );
        // console.log(getData);
    } 
    if (msg.text?.toString().toLowerCase() === "top") {
        const chatId = msg.chat.id;
        const topCrypto = ['BTC', 'ETH', 'USDT', 'BNB', 'DOGE']

        const data: {BTC: Crypto[], ETH: Crypto[], USDT: Crypto[], BNB: Crypto[], DOGE: Crypto[]} = { 
          BTC:  await (cryptpService.getCryptoByName('BTC')),
          ETH:  await (cryptpService.getCryptoByName('ETH')),
          USDT:  await (cryptpService.getCryptoByName('USDT')),
          BNB:  await (cryptpService.getCryptoByName('BNB')),
          DOGE:  await (cryptpService.getCryptoByName('DOGE')),
        

        };
        let ans: Array<String> = [];
        for (const [key, value] of Object.entries(data)) {
            ans = [...ans, ans? `\n  /${key} \n` : `\n  ${key} \n`]
            let a = value.map(coin => {
                return `${coin.exchange} : ${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`
             })
            ans = [...ans, ...a]
          }
          

        bot.sendMessage(chatId, ans.join('\n') );
        // console.log(getData);
    } 
    if (msg.text?.toString().toLowerCase() === "hi") {
        bot.sendMessage(chatId,`Hello dear ${msg.chat.first_name}`);
    }
});
