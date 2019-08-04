const moment = require('moment-timezone');
const { catcher } = require('../lib/common');
const { filterDiscordMessage } = require('./filters');

const {
  TIMEZONE,
  TIME_FORMAT,
  TELEGRAM_PARSE_MODE,
} = require('../constants');

const formatMessage = ({
  username, channelName, content, createdTimestamp, editedTimestamp,
}) => {
  const timestamp = moment.tz(editedTimestamp || createdTimestamp, TIMEZONE);
  const time = timestamp.format(TIME_FORMAT);

  return `${time}\n *${username}* said in channel *${channelName}* that\n\n ${content}`;
};

module.exports.sendMessageToTelegram = catcher(async ({
  telegramBot, store, message, action, messageId,
}) => {
  const { TELEGRAM_CHANNEL_ID } = process.env;

  const telegramMessage = await action({
    messageId,
    bot: telegramBot,
    channelId: TELEGRAM_CHANNEL_ID,
    message: formatMessage(message),
  });
  const telegramMessageId = telegramMessage.message_id;

  store.set(message.id, { telegramMessageId, message });
});

module.exports.telegramActions = {
  SEND: ({ bot, channelId, message }) => bot
    .sendMessage(channelId, message, { parse_mode: TELEGRAM_PARSE_MODE }),
  DELETE: ({ bot, channelId, messageId }) => bot
    .deleteMessage(channelId, messageId),
  EDIT: ({
    bot, channelId, message, messageId,
  }) => bot
    .editMessageText(message, {
      chat_id: channelId,
      message_id: messageId,
      parse_mode: TELEGRAM_PARSE_MODE,
    }),
};

module.exports.getChannel = catcher(
  (client, channelName) => client.channels.find(channel => channel.name === channelName),
);

module.exports.getMessages = catcher(async (channel, limit) => {
  const messages = await channel.fetchMessages({ limit });
  const filteredMessages = [...messages]
    .map(([, msg]) => filterDiscordMessage(msg));

  return filteredMessages;
});
