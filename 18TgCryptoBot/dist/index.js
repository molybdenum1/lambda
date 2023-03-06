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
const db = new sqlite3_1.Database('./db/user.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});
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
            "keyboard": [[{ text: 'Add' }, { text: 'Delete' }], [{ text: "Main" }]]
        }
    });
}));
bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h;
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
        if (last_clicked_coin) {
            let select = yield getDataFromDb(`SELECT * from user 
            WHERE username='${msg.chat.username}' AND coin='${last_clicked_coin}'`);
            if (!select.length) {
                let sql = `INSERT INTO user(username, chat_id, coin) VALUES 
                ("${msg.chat.username}",${msg.chat.id}, "${last_clicked_coin}")`;
                // console.log(sql);
                db.all(sql, [], (err) => {
                    if (err)
                        console.log(err.message);
                    // rows.forEach((row:any) => console.log(row))
                    else
                        console.log('A row has been inserted in user table.');
                });
                bot.sendMessage(chatId, `Added in your list of fav`);
            }
            else {
                bot.sendMessage(chatId, `You have already added this coin`);
            }
        }
        else {
            bot.sendMessage(chatId, `Pick coin you main to add`);
        }
    }
    if (((_e = msg.text) === null || _e === void 0 ? void 0 : _e.toString().toLowerCase()) === "delete") {
        if (last_clicked_coin) {
            let select = yield getDataFromDb(`SELECT * from user 
            WHERE username='${msg.chat.username}' AND coin='${last_clicked_coin}'`);
            if (select.length) {
                let sql = `DELETE FROM user where username='${msg.chat.username}' AND coin='${last_clicked_coin}';`;
                console.log(sql);
                db.all(sql, [], (err) => {
                    if (err)
                        console.log(err.message);
                    // rows.forEach((row:any) => console.log(row))
                    else
                        console.log('A row has been deleted in user table.');
                });
                bot.sendMessage(chatId, `Deleted from your list of fav`);
            }
            else {
                bot.sendMessage(chatId, `You have already added this coin`);
            }
        }
        else {
            bot.sendMessage(chatId, `Pick coin you main to add`);
        }
    }
    if (((_f = msg.text) === null || _f === void 0 ? void 0 : _f.toString().toLowerCase()) === "list") {
        let sql = `SELECT * FROM user WHERE username = '${msg.chat.username}'`;
        const data = yield getDataFromDb(sql);
        if (data.length) {
            let ans = ['Your list of favourites coins', ...data.map(str => ' /' + str.coin)];
            bot.sendMessage(chatId, ans.join('\n'));
        }
        else {
            bot.sendMessage(chatId, `You haven't add anything`);
        }
    }
    if (((_g = msg.text) === null || _g === void 0 ? void 0 : _g.toString().toLowerCase()) === "help") {
        let ans = 'Type Crypta <crypto_name> to search info about this crypto\n' +
            'Use Buttonts for navigation:\n' +
            '   Top - list of the top crypto\n' +
            '   Help - for help\n' +
            '   List - will show your list of fav crypto';
        bot.sendMessage(chatId, ans);
    }
    if (((_h = msg.text) === null || _h === void 0 ? void 0 : _h.toString().toLowerCase()) === "hi") {
        // console.log(msg);
        bot.sendMessage(chatId, `Hello dear ${msg.chat.first_name}`);
        // db.all('SELECT * FROM user', [], (err, rows) => {
        //     if(err) throw err;
        //     rows.forEach(row => console.log(row))
        // })
        console.log(last_clicked_coin);
    }
}));
const getDataFromDb = (sql) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                resolve(rows);
            });
        });
    });
};
// bot.sendMessage(376757358, 'як грубо')
