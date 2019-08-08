const Discord = require('discord.js');
const moment = require('moment-timezone');
const { catcher } = require('../lib/common');
const events = require('./events');
const { LOCALE } = require('../constants/discord-bridge');

moment.locale(LOCALE);

module.exports.createClient = catcher(async () => {
  const { DISCORD_TOKEN } = process.env;

  const client = new Discord.Client();
  client.login(DISCORD_TOKEN);

  return client;
});

module.exports.listen = catcher(async (client, telegram) => {
  const { DISCORD_CHANNEL_NAMES } = process.env;
  const channelNames = DISCORD_CHANNEL_NAMES.split(',');
  const store = new Map();

  const telegramBot = await telegram;

  Object.keys(events).forEach((eventName) => {
    client.on(eventName, catcher(events[eventName]({
      client, telegramBot, store, channelNames,
    })));
  });
});
