export function startHandler(ctx, state) {
    state.firstText = '';
    state.secondText = '';
    state.interactionStage = 'waitingForDate';
    ctx.reply('Добро пожаловать! Укажите дату (например, 1 декабря):');
}
