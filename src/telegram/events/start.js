module.exports = ({ client }) => ({
  description: 'Start rs-bumblebee',
  method: ({
    from: {
      first_name: firstName,
      last_name: lastName,
    },
  }) => {
    const { TELEGRAM_ADMIN_CHANNEL_ID } = process.env;

    const message = `Hello *${firstName} ${lastName}*! Glad to see you.\nType /help for available options.`;

    client.sendMessage(TELEGRAM_ADMIN_CHANNEL_ID, message, { parse_mode: 'Markdown' });
  },
});
