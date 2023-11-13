// bot.js
const TelegramBot = require('node-telegram-bot-api');

const token = '6427927644:AAHFmsFigf6oD91DorsFAcFOKVkg4lv-o6s';
//O polling: true indica que o bot utilizará o modo de polling para receber as atualizações do Telegram. Isso significa que a biblioteca fará consultas regulares à API do Telegram para verificar se há novas mensagens ou eventos para o bot.
const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  console.log(error); // Log do erro caso ocorra algum problema com o modo de polling
});

module.exports = {bot};