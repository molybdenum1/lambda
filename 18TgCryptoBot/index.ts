import TelegramBot from "node-telegram-bot-api";
import CryptoService from "./service/crypto.service";
import { Crypto, YourList } from "./src/intefaces/crypto.interface";
import { db, getDataFromDb } from "./db/scripts/index";
import { config } from "./src/config";

const token = config.botToken;

const bot = new TelegramBot(token, { polling: true });

const cryptpService = new CryptoService();

let last_clicked_coin = "";

bot.onText(/\/start|main/i, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `You're in the main menu, ${msg.chat.first_name}`, {
    reply_markup: {
      keyboard: [[{ text: "Top" }, { text: "Help" }], [{ text: "List" }]],
    },
  });
});
bot.onText(/(?:^|\W)BTC|ETH|DOGE|BNB|USDT(?:$|\W)/g, async (msg) => {
  const chatId = msg.chat.id;
  const coin = msg.text?.substring(1) || "";
  last_clicked_coin = coin;

  const getData: Crypto[] = await cryptpService.getCryptoByName(coin);
  const ans = [
    " NAME | SYMBOL | PRICE NOW | CHANGE FOR LAST HOUR \n",
    ...getData.map((coin) => {
      return `${coin.name}  ${coin.symbol} ${coin.Now.toFixed(
        3
      )} ${coin.hourAgo.toFixed(2)}%`;
    }),
  ];
  bot.sendMessage(chatId, ans.join("\n"), {
    reply_markup: {
      keyboard: [[{ text: "Add" }, { text: "Delete" }], [{ text: "Main" }]],
    },
  });
});

bot.on("message", async (msg: any) => {
  const chatId = msg.chat.id;
  let cmd, crypta;
  msg.text.split(" ").length > 1
    ? ([cmd, crypta] = msg.text.split(" "))
    : (cmd = msg.text);
  if (cmd.toString().toLowerCase() === ("crypta" || "crypto")) {
    console.log(crypta);

    last_clicked_coin = crypta;
    const getData: Crypto[] = await cryptpService.getCryptoByName(crypta);
    if (crypta) {
      const ans = [
        " NAME | SYMBOL | PRICE NOW | PRICE HOUR AGO \n",
        ...getData.map((coin) => {
          return `${coin.name}  ${coin.symbol} ${
            coin.Now
          } ${coin.hourAgo.toFixed(2)}%`;
        }),
      ];
      bot.sendMessage(chatId, ans.join("\n"));
    } else {
      bot.sendMessage(chatId, "No such coin name or symbol");
    }
  }

  if (msg.text?.toString().toLowerCase() === "bitoc") {
    const chatId = msg.chat.id;
    last_clicked_coin = "BTC";
    const getData: Crypto[] = await cryptpService.getCryptoByName("BTC");
    const ans = getData.map((coin) => {
      return `${coin.name}  ${coin.symbol} ${coin.Now} ${coin.hourAgo.toFixed(
        2
      )}%`;
    });
    bot.sendMessage(chatId, ans.join("\n"));
    // console.log(getData);
  }
  if (msg.text?.toString().toLowerCase() === "top") {
    const chatId = msg.chat.id;
    const topCrypto = ["BTC", "ETH", "USDT", "BNB", "DOGE"];

    const data: {
      BTC: Crypto[];
      ETH: Crypto[];
      USDT: Crypto[];
      BNB: Crypto[];
      DOGE: Crypto[];
    } = {
      BTC: await cryptpService.getCryptoByName("BTC"),
      ETH: await cryptpService.getCryptoByName("ETH"),
      USDT: await cryptpService.getCryptoByName("USDT"),
      BNB: await cryptpService.getCryptoByName("BNB"),
      DOGE: await cryptpService.getCryptoByName("DOGE"),
    };
    let ans: Array<String> = [];
    for (const [key, value] of Object.entries(data)) {
      ans = [...ans, ans ? `\n  /${key} \n` : `\n  ${key} \n`];
      let a = value.map((coin) => {
        return `${coin.exchange} : \n  ${coin.name}  ${
          coin.symbol
        } ${coin.Now.toFixed(3)} ${coin.hourAgo.toFixed(2)}%`;
      });
      ans = [...ans, ...a];
    }

    bot.sendMessage(chatId, ans.join("\n"));
    // console.log(getData);
  }
  if (msg.text?.toString().toLowerCase() === "add") {
    if (last_clicked_coin) {
      let select: YourList[] = (await getDataFromDb(`SELECT * from user 
            WHERE username='${msg.chat.username}' AND coin='${last_clicked_coin}'`)) as YourList[];

      if (!select.length) {
        let sql = `INSERT INTO user(username, chat_id, coin) VALUES 
                ("${msg.chat.username}",${msg.chat.id}, "${last_clicked_coin}")`;
        // console.log(sql);
        db.all(sql, [], (err: any) => {
          if (err) console.log(err.message);
          // rows.forEach((row:any) => console.log(row))
          else console.log("A row has been inserted in user table.");
        });
        bot.sendMessage(chatId, `Added in your list of fav`);
      } else {
        bot.sendMessage(chatId, `You have already added this coin`);
      }
    } else {
      bot.sendMessage(chatId, `Pick coin you main to add`);
    }
  }
  if (msg.text?.toString().toLowerCase() === "delete") {
    if (last_clicked_coin) {
      let select: YourList[] = (await getDataFromDb(`SELECT * from user 
            WHERE username='${msg.chat.username}' AND coin='${last_clicked_coin}'`)) as YourList[];
      if (select.length) {
        let sql = `DELETE FROM user where username='${msg.chat.username}' AND coin='${last_clicked_coin}';`;
        console.log(sql);

        db.all(sql, [], (err: any) => {
          if (err) console.log(err.message);
          // rows.forEach((row:any) => console.log(row))
          else console.log("A row has been deleted in user table.");
        });

        bot.sendMessage(chatId, `Deleted from your list of fav`);
      } else {
        bot.sendMessage(chatId, `You have already added this coin`);
      }
    } else {
      bot.sendMessage(chatId, `Pick coin you main to add`);
    }
  }

  if (msg.text?.toString().toLowerCase() === "list") {
    let sql = `SELECT * FROM user WHERE username = '${msg.chat.username}'`;
    const data: YourList[] = (await getDataFromDb(sql)) as YourList[];
    if (data.length) {
      let ans = [
        "Your list of favourites coins",
        ...data.map((str) => " /" + str.coin),
      ];
      bot.sendMessage(chatId, ans.join("\n"));
    } else {
      bot.sendMessage(chatId, `You haven't add anything`);
    }
  }
  if (msg.text?.toString().toLowerCase() === "help") {
    let ans =
      "Type Crypta <crypto_name> to search info about this crypto\n" +
      "Use Buttonts for navigation:\n" +
      "   Top - list of the top crypto\n" +
      "   Help - for help\n" +
      "   List - will show your list of fav crypto";
    bot.sendMessage(chatId, ans);
  }

  if (msg.text?.toString().toLowerCase() === "hi") {
    bot.sendMessage(chatId, `Hello dear ${msg.chat.first_name}`);
    console.log(last_clicked_coin);
  }
});
