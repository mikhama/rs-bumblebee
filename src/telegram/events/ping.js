module.exports = ({ client }) => ({
  description: 'Show status if rs-bumblebee is available',
  method: () => {
    const { TELEGRAM_ADMIN_CHANNEL_ID } = process.env;

    const messages = [
      'I\'m here!',
      'Sir, yes, sir!',
      'I am waiting for orders.',
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);

    client.sendMessage(TELEGRAM_ADMIN_CHANNEL_ID, messages[randomIndex]);
  },
});
