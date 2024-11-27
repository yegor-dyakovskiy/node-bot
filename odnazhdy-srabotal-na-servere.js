const { Telegraf } = require('telegraf');
const { botID } = require('./config');
const express = require('express');
const fs = require('fs');
const path = require('path');

console.log(botID);

const bot = new Telegraf(botID);

// Указываем базовый адрес сервера
const WEBHOOK_URL = 'https://node.gorny-club.kz/webhook';

// Настройка команды start
bot.start((ctx) => ctx.reply('Welcome to node-telegraf'));

// Обработка сообщений
bot.on('message', (ctx) => {
    const chatId = ctx.chat.id;

    if (ctx.message.text === 'меню') {
        ctx.reply(
            'Список команд: \n /menu - вызвать меню \n /help - помощь \n /start - начать новую сессию'
        );
    } else if (ctx.message.text === 'пока') {
        ctx.reply('До скорого!');
    }
});

// Устанавливаем Webhook
bot.telegram.setWebhook(WEBHOOK_URL);

// Создаем Express-сервер
const app = express();

// Обработка запросов на /webhook
app.use(bot.webhookCallback('/webhook'));

// Логирование ошибок
let lastError = null;
const errorLogFilePath = path.join(__dirname, 'error.log');

// Функция для записи ошибок в файл
function logErrorToFile(error) {
    const timestamp = new Date().toISOString();
    const errorMessage = `[${timestamp}] ${error.stack || error.message}\n`;
    fs.appendFile(errorLogFilePath, errorMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
    console.error('Error occurred:', err); // Вывод ошибки в консоль
    lastError = err; // Сохраняем последнюю ошибку
    logErrorToFile(err); // Записываем ошибку в файл
    res.status(500).send('Internal Server Error');
});

// Страница для вывода ошибок
app.get('/', (req, res) => {
    if (lastError) {
        res.status(200).send(`
            <h1>Последняя ошибка:</h1>
            <pre>${lastError.stack || lastError.message}</pre>
        `);
    } else {
        res.status(200).send('<h1>Ошибок нет</h1>');
    }
});

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
