import axios from 'axios';

// Получение изображения из Telegram по URL
export async function fetchImageFromTelegram(ctx, fileId) {
    const fileUrl = await ctx.telegram.getFileLink(fileId);
    const response = await axios({ url: fileUrl.href, responseType: 'arraybuffer' });
    return Buffer.from(response.data);
}
