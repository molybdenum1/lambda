const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const http = require('http');

const token = "5532231281:AAEausTueRpgXkBLF53B9e6NgfPn4xH9ia0";

const bot = new TelegramBot(token, { polling: true });
const apiLink = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9b4d258b0805206bc644291830b014ff`;

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    reply_markup: {
      keyboard: [["weather"], ["currency"]],
    },
  });
});

bot.onText(/main/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    reply_markup: {
      keyboard: [["weather"], ["currency"]],
    },
  });
});
bot.onText(/currency/, (msg) => {
  bot.sendMessage(msg.chat.id, "currency", {
    reply_markup: {
      keyboard: [["usd"], ["euro"], ["main"]],
    },
  });
});

bot.onText(/weather/, (msg) => {
  bot.sendMessage(msg.chat.id, 'weather city', {
    reply_markup: {
      keyboard: [["Wheather in London"], ["Wheather in Kiev"], ["Wheather in Berlin"], ["Wheather in Tel-Aviv"], ["main"]],
    },
  });
});

bot.on("message", async (msg) => {
  
  if (msg.text.toString().toLowerCase().includes("wheather in")) {
    let weather = await axios
      .get(apiLink(msg.text.split(" ")[2]))
      .then((response) => response.data)
      .catch(function (error) {
        console.error(error);
      });
    // console.log(apiLink(msg.text.split(" ")[2]));
    bot.sendMessage(msg.chat.id, parseWeatherToText(weather));
  }
  if(msg.text.toString().toLowerCase().indexOf("usd") === 0) {
    let currency = await axios.get('https://open.er-api.com/v6/latest/UAH')
                              .then((res) => res.data)
                              .catch((error) => console.error(error) )

                       // console.log(currency);
    bot.sendMessage(msg.chat.id, `1 USD is ${(1 / +currency.rates.USD).toFixed(2)} UAH\n`);
  }
  if(msg.text.toString().toLowerCase().indexOf("euro") === 0) {
    let currency = await axios.get('https://open.er-api.com/v6/latest/UAH')
                              .then((res) => res.data)
                              .catch((error) => console.error(error) )

                        //console.log(currency);
    bot.sendMessage(msg.chat.id, `1 EURO is ${(1 / +currency.rates.EUR).toFixed(2)} UAH\n`);
  }
  
  else {
   // bot.sendMessage(msg.chat.id, msg.text);
    //console.log(msg);
  }
});

function parseWeatherToText(weather) {
  let msg = weather.city.name + ", " + weather.city.country;
  for (let i = 0; i < weather.list.length; i++) {
    let days = weather.list;
    let date = new Date(days[i].dt * 1000);

    msg +=
      "\n  " +
      date.getDate() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getFullYear() +
      " " +
      +date.getUTCHours() +
      ":00";
    msg +=
      "\n\t" +
      "Temperatur: " +
      Math.floor(days[i].main.temp - 274.15) +
      " °C";
    msg +=
      "\n\t" +
      "Feels like: " +
      Math.floor(days[i].main.feels_like - 274.15) +
      " °C";
    msg += "\n\t" + days[i].weather[0].description + "\n";
  }
  return msg;
}
