const { saveTime, readTime } = require('../time-logger');
const {
  getChannel, getMessages, sendMessageToTelegram, telegramActions,
} = require('../utils');

module.exports = ({
  client, telegramBot, store, channelNames,
}) => async () => {
  global.console.log('Discord client is listening...');

  const channels = await Promise.all(channelNames
    .map(channel => getChannel(client, channel)));

  const messages = (await Promise.all(channels
    .map(channel => getMessages(channel, 5))))
    .reduce((acc, cur) => acc.concat(cur), []);

  const savedTimestamp = (await readTime()).timestamp;
  const messagesAfterTimestamp = messages
    .filter(({ editedTimestamp, createdTimestamp }) => {
      const timestamp = editedTimestamp || createdTimestamp;
      return savedTimestamp < timestamp;
    });

  messagesAfterTimestamp.reverse();
  messagesAfterTimestamp.forEach(message => sendMessageToTelegram({
    telegramBot, store, message, action: telegramActions.SEND,
  }));

  global.console.log('MESSAGES WERE SENT =>', messagesAfterTimestamp);

  const timestamp = Date.now();
  await saveTime({ timestamp });
};
