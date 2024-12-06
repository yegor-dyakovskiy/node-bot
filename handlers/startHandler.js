import { Markup } from 'telegraf';

export function startHandler(ctx, state) {
    state.interactionStage = 'waitingForBranch'; // Этап выбора ветки

    // Создаем кнопки для выбора ветки
    const keyboard = Markup.inlineKeyboard([
        Markup.button.callback('Выбрать пост', 'choose_post'),
        Markup.button.callback('Выбрать сторис', 'choose_story'),
    ]);

    // Отправляем сообщение с клавиатурой
    ctx.reply('Добро пожаловать! Выберите то, что нужно сделать:', keyboard);
}
