// src/bot.js
import { Telegraf } from 'telegraf';
import { Markup } from 'telegraf';
import { botID } from './config.js';
import { startHandler } from './handlers/startHandler.js';
import { postTextHandler } from './handlers/textHandler.js';
import {
    postDocumentHandler,
    storyDocumentHandlerUp,
    storyDocumentHandlerDown,
} from './handlers/documentHandler.js';

const bot = new Telegraf(botID);

// Храним состояния для каждого пользователя
const userStates = {};

bot.start((ctx) => {
    // Инициализируем состояние для пользователя, если его нет
    if (!userStates[ctx.from.id]) {
        userStates[ctx.from.id] = {
            firstText: '',
            secondText: '',
            interactionStage: '', // Не указываем начальный этап
            currentBranch: '', // Не указываем текущую ветку
            storyPosition: '', // Для хранения выбранной позиции в сторис
        };
    } else {
        // Если пользователь уже есть, очищаем некоторые значения
        userStates[ctx.from.id].firstText = '';
        userStates[ctx.from.id].secondText = '';
        userStates[ctx.from.id].interactionStage = '';
        userStates[ctx.from.id].currentBranch = '';
        userStates[ctx.from.id].storyPosition = ''; // Очищаем выбор позиции для сториса
    }

    startHandler(ctx, userStates[ctx.from.id]);
    console.log(userStates);
});

// Обработчик для выбора поста
bot.action('choose_post', (ctx) => {
    const userState = userStates[ctx.from.id];

    // Обновляем текущую ветку и этап только после выбора
    userState.currentBranch = 'post';
    userState.interactionStage = 'waitingForDate'; // Переход на этап ожидания даты

    ctx.reply('Вы выбрали ветку "Пост". Напишите дату похода');
    console.log(userState);
});

// Обработчик для выбора сториса
bot.action('choose_story', (ctx) => {
    const userState = userStates[ctx.from.id];

    // Обновляем текущую ветку и этап только после выбора
    userState.currentBranch = 'story';
    userState.interactionStage = 'waitingForPosition'; // Переход на этап ожидания выбора позиции сториса

    // Создаем клавиатуру с кнопками для выбора позиции
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('Снизу', 'choose_position_down')],
        [Markup.button.callback('Сверху', 'choose_position_up')],
    ]);

    // Отправляем сообщение с клавиатурой
    ctx.reply('Сторис снизу или сверху? Выберите:', keyboard);
    console.log(userState);
});

bot.action('choose_position_down', (ctx) => {
    const userState = userStates[ctx.from.id];

    // Обновляем состояние на выбор "снизу"
    userState.storyPosition = 'down';
    userState.interactionStage = 'waitingForDate'; // Переход к следующему этапу

    ctx.reply('Сторис, низ. Введите дату похода');
    console.log(userState);
});

bot.action('choose_position_up', (ctx) => {
    const userState = userStates[ctx.from.id];

    // Обновляем состояние на выбор "сверху"
    userState.storyPosition = 'up';
    userState.interactionStage = 'waitingForDate'; // Переход к следующему этапу

    ctx.reply('Сторис, верх. Введите дату похода');
    console.log(userState);
});

// Обработчик текста
bot.on('text', (ctx) => {
    const userState = userStates[ctx.from.id];

    // Проверка на текущую ветку
    if (userState.currentBranch === 'post') {
        // Логика для ветки "Пост"
        postTextHandler(ctx, userState);
    } else if (userState.currentBranch === 'story') {
        // Логика для ветки "Сторис"
        if (userState.storyPosition === 'up') {
            // Логика для сториса с выбором "Сверху"
            postTextHandler(ctx, userState);
        } else if (userState.storyPosition === 'down') {
            // Логика для сториса с выбором "Снизу"
            postTextHandler(ctx, userState);
        } else {
            // Если позиция не выбрана, напомнить о необходимости выбора
            ctx.reply('Выберите позицию для сториса (сверху или снизу).');
        }
    } else {
        ctx.reply('Выберите ветку перед продолжением!');
    }

    console.log(userStates);
});

// Обработчик документа
bot.on('document', (ctx) => {
    const userState = userStates[ctx.from.id];

    // Проверка на текущую ветку
    if (userState.currentBranch === 'post') {
        // Логика для обработки документов в ветке "Пост"
        postDocumentHandler(ctx, userState);
    } else if (userState.currentBranch === 'story') {
        // Логика для обработки документов в ветке "Сторис"
        if (userState.storyPosition === 'up') {
            // Логика для сториса с выбором "Сверху"
            storyDocumentHandlerUp(ctx, userState);
        } else if (userState.storyPosition === 'down') {
            // Логика для сториса с выбором "Снизу"
            storyDocumentHandlerDown(ctx, userState);
        } else {
            // Если позиция не выбрана, напомнить о необходимости выбора
            ctx.reply('Выберите позицию для сториса (сверху или снизу).');
        }
    } else {
        ctx.reply('Выберите ветку перед продолжением!');
    }

    console.log(userStates);
});

export default bot;
