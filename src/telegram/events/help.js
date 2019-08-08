module.exports = ({ client }) => ({
  description: 'Show this message',
  method: () => {
    const { TELEGRAM_ADMIN_CHANNEL_ID } = process.env;

    // eslint-disable-next-line global-require
    const events = require('./index');

    const message = Object.keys(events)
      .map(eventName => `/${eventName} : ${events[eventName]({ client }).description}`)
      .join('\n');

    client.sendMessage(TELEGRAM_ADMIN_CHANNEL_ID, message, { parse_mode: 'Markdown' });
  },
});
