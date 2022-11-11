const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '5532231281:AAEausTueRpgXkBLF53B9e6NgfPn4xH9ia0';
//https://api.openweathermap.org/data/2.5/forecast?q=kharkiv&appid=9b4d258b0805206bc644291830b014ff

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {

    
});

bot.on('message', async (msg) => {
 
});