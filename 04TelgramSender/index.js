const TelegramBot = require("node-telegram-bot-api");
const { program } = require("commander");

// replace the value below with the Telegram token you receive from @BotFather
const token = "5590328138:AAF-89MgPjEQQLeubUJnJ1ra5UlrBuuemAo";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text.toString().toLowerCase().includes("bye")) {
    bot.sendMessage(chatId, "Hope to see you around again , Bye");
  }
  if (msg.text.toString().toLowerCase().includes("hi")) {
    bot.sendMessage(chatId, "хелоу");
  }
  if (msg.text.toString().toLowerCase().includes("hello")) {
    bot.sendMessage(chatId, "хелоу");
  }
  if (msg.text.toString().toLowerCase().includes("hello")) {
    console.log(msg);
    bot.sendPhoto(
      chatId,
      "https://www.rbc.ua/static/img/t/o/tornado_01_650x410.jpg"
    );
  }
});

program.name("sender from cli").description("CLI to telegram").version("0.1.0");

program
  .command("sender")
  .description("Send your message from cli to telegram bot")
  .argument("<string>", "string to send")
  .option("--m", "sendind text message")
  .option("--p", "sending a photo from web or your pc")
  .action(async (str, options) => {
    if (options.m) {
      await bot.sendMessage(389429451, str);
      process.exit();
    }
    if (options.p) {
      await bot.sendPhoto(389429451, str);
      process.exit();
    }
  });

program.parse();
