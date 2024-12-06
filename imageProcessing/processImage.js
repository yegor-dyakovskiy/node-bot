import heicConvert from 'heic-convert';
import sharp from 'sharp';
import {
    createGradientSvg,
    createTextSvg,
    createStoryUpGradientSvg,
    createStoryDownGradientSvg,
    createStoryUpTextSvg,
    createStoryDownTextSvg,
} from '../variables/svgTemplates.js';

// Конвертация HEIC в JPEG
export async function convertHeicToJpeg(buffer) {
    return await heicConvert({
        buffer,
        format: 'JPEG',
    });
}

// Ресайз и обработка изображения
export async function processImage(buffer, firstText, secondText, contentType) {
    let aspectRatio;
    let width, height;

    // Определяем соотношение сторон и размеры
    if (contentType === 'post') {
        aspectRatio = 1 / 1; // квадрат (1:1)
        width = 1080;
        height = 1080;
    } else if (contentType === 'story_up' || contentType === 'story_down') {
        aspectRatio = 9 / 16; // вертикальный (9:16)
        width = 1080;
        height = Math.round(width / aspectRatio); // вычисляем высоту по соотношению
    } else {
        throw new Error('Неизвестный тип контента');
    }

    // Получаем метаданные изображения
    const metadata = await sharp(buffer).metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;

    // Рассчитываем новые размеры для обрезки, чтобы сохранить соотношение сторон
    let resizeWidth, resizeHeight;

    if (originalWidth / originalHeight > aspectRatio) {
        // Если изображение шире, чем нужно (по соотношению)
        resizeHeight = height;
        resizeWidth = Math.round(height * (originalWidth / originalHeight));
    } else {
        // Если изображение уже, чем нужно (по соотношению)
        resizeWidth = width;
        resizeHeight = Math.round(width * (originalHeight / originalWidth));
    }

    // Обрезаем изображение для сохранения нужных пропорций
    const resizedBuffer = await sharp(buffer)
        .resize(resizeWidth, resizeHeight, { fit: 'cover', kernel: 'lanczos3' })
        .extract({
            left: Math.floor((resizeWidth - width) / 2), // Центрируем обрезку по горизонтали
            top: Math.floor((resizeHeight - height) / 2), // Центрируем обрезку по вертикали
            width: width,
            height: height,
        })
        .toBuffer();

    // Применяем шаблоны для поста или сториса
    let gradientSvg, textSvg;
    if (contentType === 'post') {
        gradientSvg = createGradientSvg(width); // Для поста
        textSvg = createTextSvg(width, firstText, secondText);
    } else if (contentType === 'story_up') {
        gradientSvg = createStoryUpGradientSvg(width); // Для сториса (сверху)
        textSvg = createStoryUpTextSvg(width, firstText, secondText);
    } else if (contentType === 'story_down') {
        gradientSvg = createStoryDownGradientSvg(width); // Для сториса (снизу)
        textSvg = createStoryDownTextSvg(width, firstText, secondText);
    }

    const gradientBuffer = Buffer.from(gradientSvg);
    const textBuffer = Buffer.from(textSvg);

    // Возвращаем обработанное изображение
    return await sharp(resizedBuffer)
        .composite([
            { input: gradientBuffer, blend: 'over' },
            { input: textBuffer, blend: 'over' },
        ])
        .jpeg({ quality: 90 })
        .toBuffer();
}
