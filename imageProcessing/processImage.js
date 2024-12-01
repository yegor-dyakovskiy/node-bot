import heicConvert from 'heic-convert';
import sharp from 'sharp';
import { createGradientSvg, createTextSvg } from '../variables/svgTemplates.js';

// Конвертация HEIC в JPEG
export async function convertHeicToJpeg(buffer) {
    return await heicConvert({
        buffer,
        format: 'JPEG',
    });
}

// Ресайз и обработка изображения
export async function processImage(buffer, fixedSize, firstText, secondText) {
    const resizedBuffer = await sharp(buffer)
        .resize(fixedSize, fixedSize, { fit: 'cover', kernel: 'lanczos3' })
        .toBuffer();

    const gradientSvg = createGradientSvg(fixedSize);
    const textSvg = createTextSvg(fixedSize, firstText, secondText);

    const gradientBuffer = Buffer.from(gradientSvg);
    const textBuffer = Buffer.from(textSvg);

    return await sharp(resizedBuffer)
        .composite([
            { input: gradientBuffer, blend: 'over' },
            { input: textBuffer, blend: 'over' },
        ])
        .jpeg({ quality: 90 })
        .toBuffer();
}
