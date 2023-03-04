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
const token = '5891307863:AAHaiPlgVoTSKgsH6tLNGYdMlp8ppKKpEyY';
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const cryptpService = new crypto_service_1.default();
bot.onText(/\/start/i, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Hello dear ${msg.chat.first_name}`, {
        "reply_markup": {
            "keyboard": [[{ text: 'Top' },]]
        }
    });
});
bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const chatId = msg.chat.id;
    let cmd, crypta;
    msg.text.split(' ').length > 1 ? [cmd, crypta] = msg.text.split(' ') : cmd = msg.text;
    if (cmd.toString().toLowerCase() === ('crypta' || 'crypto')) {
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
    if (((_a = msg.text) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) === "bitoc") {
        const chatId = msg.chat.id;
        const getData = yield (cryptpService.getCryptoByName('BTC'));
        const ans = getData.map(coin => {
            return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`;
        });
        bot.sendMessage(chatId, ans.join('\n'));
        // console.log(getData);
    }
    if (((_b = msg.text) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase()) === "top") {
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
    if (((_c = msg.text) === null || _c === void 0 ? void 0 : _c.toString().toLowerCase()) === "hi") {
        bot.sendMessage(chatId, `Hello dear ${msg.chat.first_name}`);
    }
}));
