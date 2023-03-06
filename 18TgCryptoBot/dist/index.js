"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const crypto_service_1 = __importDefault(require("./service/crypto.service"));
const sqlite3_1 = require("sqlite3");
const token = '5891307863:AAHaiPlgVoTSKgsH6tLNGYdMlp8ppKKpEyY';
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const db = new sqlite3_1.Database('./db/user.db');
const cryptpService = new crypto_service_1.default();
let last_clicked_coin = '';
bot.onText(/\/start|main/i, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `You're in the main menu, ${msg.chat.first_name}`, {
        "reply_markup": {
            "keyboard": [[{ text: 'Top' }, { text: 'Help' }], [{ text: 'List' }]]
        }
    });
});
bot.onText(/(?:^|\W)BTC|ETH|DOGE|BNB|USDT(?:$|\W)/g, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = msg.chat.id;
    const coin = ((_a = msg.text) === null || _a === void 0 ? void 0 : _a.substring(1)) || '';
    last_clicked_coin = coin;
    const getData = yield (cryptpService.getCryptoByName(coin));
    const ans = [' NAME | SYMBOL | PRICE NOW | PRICE HOUR AGO \n', ...getData.map(coin => {
            return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`;
        })];
    bot.sendMessage(chatId, ans.join('\n'), {
        "reply_markup": {
            "keyboard": [[{ text: 'Add' }], [{ text: "main" }]]
        }
    });
}));
bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    const chatId = msg.chat.id;
    let cmd, crypta;
    msg.text.split(' ').length > 1 ? [cmd, crypta] = msg.text.split(' ') : cmd = msg.text;
    if (cmd.toString().toLowerCase() === ('crypta' || 'crypto')) {
        console.log(crypta);
        last_clicked_coin = crypta;
        const getData = yield (cryptpService.getCryptoByName(crypta));
        if (crypta) {
            const ans = [' NAME | SYMBOL | PRICE NOW | PRICE HOUR AGO \n', ...getData.map(coin => {
                    return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`;
                })];
            bot.sendMessage(chatId, ans.join('\n'));
        }
        else {
            bot.sendMessage(chatId, 'No such coin name or symbol');
        }
    }
    if (((_b = msg.text) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase()) === "bitoc") {
        const chatId = msg.chat.id;
        last_clicked_coin = 'BTC';
        const getData = yield (cryptpService.getCryptoByName('BTC'));
        const ans = getData.map(coin => {
            return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`;
        });
        bot.sendMessage(chatId, ans.join('\n'));
        // console.log(getData);
    }
    if (((_c = msg.text) === null || _c === void 0 ? void 0 : _c.toString().toLowerCase()) === "top") {
        const chatId = msg.chat.id;
        const topCrypto = ['BTC', 'ETH', 'USDT', 'BNB', 'DOGE'];
        const data = {
            BTC: yield (cryptpService.getCryptoByName('BTC')),
            ETH: yield (cryptpService.getCryptoByName('ETH')),
            USDT: yield (cryptpService.getCryptoByName('USDT')),
            BNB: yield (cryptpService.getCryptoByName('BNB')),
            DOGE: yield (cryptpService.getCryptoByName('DOGE')),
        };
        let ans = [];
        for (const [key, value] of Object.entries(data)) {
            ans = [...ans, ans ? `\n  /${key} \n` : `\n  ${key} \n`];
            let a = value.map(coin => {
                return `${coin.exchange} : ${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`;
            });
            ans = [...ans, ...a];
        }
        bot.sendMessage(chatId, ans.join('\n'));
        // console.log(getData);
    }
    if (((_d = msg.text) === null || _d === void 0 ? void 0 : _d.toString().toLowerCase()) === "add") {
        let sql = `INSERT INTO user VALUES (${msg.message_id},"${msg.chat.username}", ${msg.chat.id})`;
        db.run(sql, ['C'], (err) => {
            if (err)
                console.log(err.message);
            console.log('A row has been inserted in user table.');
        });
        // sql = `INSERT INTO crypto_list VALUES (${msg.message_id},${msg.message_id}, "${last_clicked_coin}")`
        // db.run(sql, ['C'], (err) => {
        //     if(err) console.log(err.message);
        //     console.log('A row has been inserted in crypto_list table.');
        // })
        bot.sendMessage(chatId, `Added in yout list of fav`);
    }
    if (((_e = msg.text) === null || _e === void 0 ? void 0 : _e.toString().toLowerCase()) === "hi") {
        bot.sendMessage(chatId, `Hello dear ${msg.chat.first_name}`);
        // db.all('SELECT * FROM user', [], (err, rows) => {
        //     if(err) throw err;
        //     rows.forEach(row => console.log(row))
        // })
        console.log(last_clicked_coin);
    }
}));
// bot.sendMessage(376757358, 'як грубо')
