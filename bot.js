// src/bot.js
import { Telegraf } from 'telegraf';
import { botID } from './config.js';
import { startHandler } from './handlers/startHandler.js';
import { textHandler } from './handlers/textHandler.js';
import { documentHandler } from './handlers/documentHandler.js';

const bot = new Telegraf(botID);

// Храним состояния для каждого пользователя
const userStates = {};

bot.start((ctx) => {
    // Инициализируем состояние для пользователя, если его нет
    if (!userStates[ctx.from.id]) {
        userStates[ctx.from.id] = {
            firstText: '',
            secondText: '',
            interactionStage: 'start',
        };
    }

    startHandler(ctx, userStates[ctx.from.id]);
});

bot.on('text', (ctx) => {
    // Если состояние пользователя не найдено, создаём его
    if (!userStates[ctx.from.id]) {
        userStates[ctx.from.id] = {
            firstText: '',
            secondText: '',
            interactionStage: 'start',
        };
    }

    textHandler(ctx, userStates[ctx.from.id]);
});

bot.on('document', (ctx) => {
    // Если состояние пользователя не найдено, создаём его
    if (!userStates[ctx.from.id]) {
        userStates[ctx.from.id] = {
            firstText: '',
            secondText: '',
            interactionStage: 'start',
        };
    }

    documentHandler(ctx, userStates[ctx.from.id]);
});

export default bot;
