const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = "5547105181:AAGoXrJEOxJ8M5HVQ0vsUsNsIHKcrMtZ90Y";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    reply_markup: {
      keyboard: [["PHOTO"], ["photo"]],
    },
  });
});

bot.on("message", async (msg) => {
  if (msg.text.toString().toLowerCase().indexOf("hi") === 0) {
    bot.sendMessage(msg.chat.id, "Hello  " + msg.from.first_name);
    console.log("User send: " + msg.text);
  } else if (msg.text.toString().toLowerCase().indexOf("photo") === 0) {
    let url = await axios.get("https://picsum.photos/200/300").then((data) => {
      return data.request.res.responseUrl;
    });
    bot.sendPhoto(msg.chat.id, url);
    console.log("User send: photo");
  } else {
    bot.sendMessage(msg.chat.id, msg.text);
    console.log("User send: " + msg.text);
  }
});
