import express from 'express';
import bot from './bot.js';

const PORT = process.env.PORT || 3000; // Render указывает порт через переменную PORT
const app = express();

// Устанавливаем Webhook
const RENDER_URL = 'https://node-bot-r093.onrender.com'; // Замените на ваш URL
bot.telegram.setWebhook(`${RENDER_URL}/webhook`);

// Маршрут для обработки Webhook
app.use(bot.webhookCallback('/webhook'));

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Webhook set to ${RENDER_URL}/webhook`);
});
