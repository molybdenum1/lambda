const TelegramBot = require('node-telegram-bot-api');
const { program } = require('commander');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5590328138:AAF-89MgPjEQQLeubUJnJ1ra5UlrBuuemAo';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text.toString().toLowerCase().includes('bye')) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
  if (msg.text.toString().toLowerCase().includes('hi')) {
      bot.sendMessage(msg.chat.id, "хелоу");
  }
  if (msg.text.toString().toLowerCase().includes('hello')) {
    bot.sendMessage(msg.chat.id, "хелоу");
  }
  // send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, 'ху'+ msg.text.slice(1));
});


program
  .option('-m')
  .option('-p')

program.parse();

const options = program.opts();
console.log(options);
if(program.args){
  if(options.m){
    bot.sendMessage(389429451, program.args.join(' '))
    process.exit()
  }
  if(options.p){
    console.log(program.args);
    bot.sendPhoto(389429451, 'https://www.rbc.ua/static/img/t/o/tornado_01_650x410.jpg')
    process.exit()
  }
}
  