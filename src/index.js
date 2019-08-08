const dotenv = require('dotenv');
const discord = require('./discord');
const telegram = require('./telegram');

dotenv.config();

const { ENV } = process.env;

const telegramBot = telegram();
discord(telegramBot);

global.console.log(`rs-bumblebee is started in --${ENV}-- environment!`);
