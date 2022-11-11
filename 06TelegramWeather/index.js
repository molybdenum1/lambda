const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '5532231281:AAEausTueRpgXkBLF53B9e6NgfPn4xH9ia0';

const bot = new TelegramBot(token, {polling: true});

const options = {
    method: 'GET',
    url: 'https://open-weather13.p.rapidapi.com/city/kharkiv',
    headers: {
      'X-RapidAPI-Key': 'fa8727c597mshfeaf0e8d3ce5c50p1d73e7jsne00f0fa6b343',
      'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["weather"]]
            }
    });
});

bot.on('message', async (msg) => {
    if (msg.text.toString().toLowerCase().indexOf('hi') === 0) {
        bot.sendMessage(msg.chat.id,"Hello  " + msg.from.first_name);
    } else if(msg.text.toString().toLowerCase().indexOf('weather') === 0){
        
    } else {
        bot.sendMessage(msg.chat.id, msg.text);
        console.log('User send: ' + msg.text);
    }
});