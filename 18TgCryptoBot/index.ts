import TelegramBot from "node-telegram-bot-api";
import CryptoService from "./service/crypto.service";
import { Crypto } from "./src/intefaces/crypto.interface";
import {Database} from "sqlite3";
import shortid from "shortid";

const token = '5891307863:AAHaiPlgVoTSKgsH6tLNGYdMlp8ppKKpEyY'

const bot = new TelegramBot(token, {polling: true});
const db = new Database('./db/user.db')
const cryptpService = new CryptoService()

let last_clicked_coin = '';

bot.onText(/\/start|main/i, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,`You're in the main menu, ${msg.chat.first_name}`, {
        "reply_markup": {
            "keyboard" : [[{text: 'Top'}, {text: 'Help'}], [{text: 'List'}]] 
        }
    });
    
});
bot.onText(/(?:^|\W)BTC|ETH|DOGE|BNB|USDT(?:$|\W)/g, async(msg) => {
    const chatId = msg.chat.id;
    const coin = msg.text?.substring(1) || '';
    last_clicked_coin = coin;

    const getData: Crypto[]  = await (cryptpService.getCryptoByName(coin))
    const ans = [' NAME | SYMBOL | PRICE NOW | PRICE HOUR AGO \n', ...getData.map(coin => {
        return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`
    })]
    bot.sendMessage(chatId, ans.join('\n'), {
        "reply_markup": {
            "keyboard" : [[{text: 'Add'} ], [{text: "main"}]] 
        }
    });
    
});


bot.on('message', async(msg: any) => {
    
    const chatId = msg.chat.id;
    let cmd, crypta;
    msg.text.split(' ').length > 1? [cmd, crypta] = msg.text.split(' '): cmd = msg.text;
    if(cmd.toString().toLowerCase() === ('crypta' || 'crypto')){
        console.log(crypta);
        
        last_clicked_coin = crypta;
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
        last_clicked_coin = 'BTC';
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
    if(msg.text?.toString().toLowerCase() === "add") {
        let sql = `INSERT INTO user VALUES (${msg.message_id},"${msg.chat.username}", ${msg.chat.id})`;
        db.run(sql, ['C'], (err) => {
            if(err) console.log(err.message);
            console.log('A row has been inserted in user table.');
        })
        // sql = `INSERT INTO crypto_list VALUES (${msg.message_id},${msg.message_id}, "${last_clicked_coin}")`
        // db.run(sql, ['C'], (err) => {
        //     if(err) console.log(err.message);
        //     console.log('A row has been inserted in crypto_list table.');
        // })
        bot.sendMessage(chatId,`Added in yout list of fav`);
    }

    if (msg.text?.toString().toLowerCase() === "hi") {
        bot.sendMessage(chatId,`Hello dear ${msg.chat.first_name}`);
        // db.all('SELECT * FROM user', [], (err, rows) => {
        //     if(err) throw err;
        //     rows.forEach(row => console.log(row))
        // })
        console.log(last_clicked_coin);
        
    }
});

// bot.sendMessage(376757358, 'як грубо')