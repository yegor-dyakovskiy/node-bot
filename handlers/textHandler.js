export function textHandler(ctx, state) {
    const { interactionStage } = state;

    if (interactionStage === 'waitingForDate') {
        state.firstText = ctx.message.text.toUpperCase();
        state.interactionStage = 'waitingForName';
        ctx.reply('Отлично! Теперь укажите название похода (например, Ледник Богдановича):');
    } else if (interactionStage === 'waitingForName') {
        state.secondText = ctx.message.text.toUpperCase();
        state.interactionStage = 'waitingForFile';
        ctx.reply(
            'Хорошо! Теперь отправьте фотографию в виде документа, которую нужно обработать.'
        );
    } else {
        ctx.reply(
            'Я уже ожидаю файл для обработки. Если хотите начать новый процесс, введите /start.'
        );
    }
}
