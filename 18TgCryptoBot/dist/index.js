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
const axios_1 = __importDefault(require("axios"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const token = '5891307863:AAHaiPlgVoTSKgsH6tLNGYdMlp8ppKKpEyY';
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot.on('message', (msg) => {
    var _a;
    const chatId = msg.chat.id;
    console.log(msg.text);
    if (((_a = msg.text) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) === "hi") {
        bot.sendMessage(chatId, `Hello dear ${msg.chat.first_name}`);
    }
    // bot.sendMessage(chatId, 'Received your message');
});
bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = msg.chat.id;
    const getData = yield (yield axios_1.default.get('http://localhost:5050/getCryptoData?coin=BTC')).data;
    const ans = getData.map(coin => {
        return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo}`;
    });
    if (((_a = msg.text) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) === "bitoc") {
        bot.sendMessage(chatId, ans.join('\n'));
        // console.log(getData);
    }
}));
