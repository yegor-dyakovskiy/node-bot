import { Telegraf } from 'telegraf';
import { botID } from './config.js';

console.log(botID);

const bot = new Telegraf(botID, {});

bot.start((ctx) => ctx.reply('Welcome to node-telegraf'));

bot.on('message', (ctx) => {
    const chatId = ctx.chat.id;

    if (ctx.message.text == 'меню') {
        ctx.reply(
            'Список команд: \n /menu - вызвать меню \n /help - помощь \n /start - начать новую сессию'
        );
    } else if (ctx.message.text == 'пока') {
        ctx.reply('До скорого!');
    }
});
bot.launch();
