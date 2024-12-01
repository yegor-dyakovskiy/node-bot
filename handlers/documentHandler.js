import sharp from 'sharp';
import { fetchImageFromTelegram } from '../helpers.js';
import { convertHeicToJpeg, processImage } from '../imageProcessing/processImage.js';

export async function documentHandler(ctx, state) {
    if (state.interactionStage !== 'waitingForFile') {
        ctx.reply('Сначала завершите предыдущий процесс или введите /start для новой обработки.');
        return;
    }

    try {
        await ctx.reply('Загрузка...');

        // Получение изображения
        const fileId = ctx.message.document.file_id;
        let buffer = await fetchImageFromTelegram(ctx, fileId);

        // Получение метаданных и конвертация, если это HEIC
        const metadata = await sharp(buffer).metadata();
        if (metadata.format === 'heic' || metadata.format === 'heif') {
            buffer = await convertHeicToJpeg(buffer);
        }

        // Вычисление размера и обработка изображения
        const { width, height } = await sharp(buffer).metadata();
        const fixedSize = Math.min(width, height);
        const processedImage = await processImage(
            buffer,
            fixedSize,
            state.firstText,
            state.secondText
        );

        // Отправка обработанного изображения
        await ctx.replyWithDocument({
            source: processedImage,
            filename: 'processed_image.jpg',
        });

        state.interactionStage = 'start';
        ctx.reply('Фотография успешно обработана! Введите /start для новой обработки.');
    } catch (error) {
        console.error('Ошибка при обработке изображения:', error);
        ctx.reply(
            `Произошла ошибка при обработке изображения. Попробуйте снова. Ошибка: ${error.message}`
        );
    }
}
