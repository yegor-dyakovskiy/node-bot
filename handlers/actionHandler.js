// src/handlers/actionHandler.js
export async function actionHandler(ctx, state) {
    try {
        const action = ctx.callbackQuery.data; // Получаем данные действия из callback_query

        switch (action) {
            case 'create_post_template':
                // Переход к созданию шаблона поста
                state.interactionStage = 'creating_post_template';
                await ctx.reply(
                    'Вы выбрали создание шаблона для поста. Отправьте изображение для обработки.'
                );
                break;

            case 'create_story_template':
                // Переход к выбору типа шаблона для сторис
                state.interactionStage = 'choosing_story_type';
                await ctx.reply('Выберите тип шаблона для сторис:', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'С текстом снизу', callback_data: 'story_bottom_text' },
                                { text: 'С текстом сверху', callback_data: 'story_top_text' },
                            ],
                        ],
                    },
                });
                break;

            case 'story_bottom_text':
                // Выбор шаблона с текстом снизу
                state.interactionStage = 'creating_story_template_bottom';
                await ctx.reply(
                    'Вы выбрали шаблон для сторис с текстом снизу. Отправьте изображение для обработки.'
                );
                break;

            case 'story_top_text':
                // Выбор шаблона с текстом сверху
                state.interactionStage = 'creating_story_template_top';
                await ctx.reply(
                    'Вы выбрали шаблон для сторис с текстом сверху. Отправьте изображение для обработки.'
                );
                break;

            default:
                // Неизвестное действие
                await ctx.reply('Неизвестное действие. Попробуйте снова.');
        }

        // Удаляем inline-кнопки после выбора
        await ctx.answerCbQuery(); // Уведомление об обработке действия
    } catch (error) {
        console.error('Ошибка при обработке действия:', error);
        await ctx.reply('Произошла ошибка при обработке вашего выбора. Попробуйте снова.');
    }
}
