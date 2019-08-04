const TelegramBot = require('node-telegram-bot-api');

module.exports = () => {
  const { TELEGRAM_TOKEN } = process.env;

  const telegram = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

  // TODO: make listeners for telegram bot
  // listen(client);
  // telegram.onText(/\/start/, (msg) => {
  //  console.log(msg.chat.id);
  // });

  return telegram;
};
