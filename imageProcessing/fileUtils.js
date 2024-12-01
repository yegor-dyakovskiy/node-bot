// src/imageProcessing/fileUtils.js
import axios from 'axios';
import sharp from 'sharp';

export async function downloadFile(fileId, telegram) {
    const fileUrl = await telegram.getFileLink(fileId);
    const response = await axios({ url: fileUrl.href, responseType: 'arraybuffer' });
    return Buffer.from(response.data);
}
