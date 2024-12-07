import fs from 'fs';
import path from 'path';

// Получаем путь к директории через import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Путь к шрифту
const fontPath = path.join(__dirname, 'centurygothic.ttf');

// Преобразуем шрифт в base64
const fontBase64 = fs.readFileSync(fontPath, 'base64');

const fontFaceStyle = `
  <style>
    @font-face {
      font-family: 'Century Gothic', sans-serif;
      src: url('data:font/ttf;base64,${fontBase64}') format('truetype');
    }
  </style>
`;

console.log(fontFaceStyle);

// Шаблон градиента для сториса сверху
export const createStoryUpGradientSvg = (fixedSize) => {
    return `
  <svg width="${fixedSize}" height="${fixedSize + 300}">
    <defs>
      <linearGradient id="storyUpGradient" x1="100%" y1="0%" x2="40%" y2="0%">
        <stop offset="0%" style="stop-color: rgba(25, 91, 108, 0); stop-opacity: 1" />
        <stop offset="100%" style="stop-color: rgba(25, 91, 108, 1); stop-opacity: 1" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="17%" fill="url(#storyUpGradient)" />
  </svg>
`;
};

// Шаблон текста для сториса сверху
export const createStoryUpTextSvg = (fixedSize, firstText, secondText) => {
    return `
  <svg width="${fixedSize}" height="${fixedSize + 300}">
    ${fontFaceStyle}
    <text x="50" y="${
        fixedSize - 990
    }" font-family="Century Gothic" font-size="70" fill="white" text-anchor="start">${firstText}</text>
    <text x="50" y="${
        fixedSize - 890
    }" font-family="Century Gothic" font-size="70" fill="white" text-anchor="start">${secondText}</text>
  </svg>
`;
};

// Шаблон градиента для сториса снизу
export const createStoryDownGradientSvg = (fixedSize) => {
    return `
<svg width="${fixedSize}" height="${fixedSize + 300}">
  <defs>
    <linearGradient id="storyUpGradient" x1="100%" y1="0%" x2="40%" y2="0%">
      <stop offset="0%" style="stop-color: rgba(25, 91, 108, 0); stop-opacity: 1" />
      <stop offset="100%" style="stop-color: rgba(25, 91, 108, 1); stop-opacity: 1" />
    </linearGradient>
  </defs>
  <rect x="0" y="1150" width="100%" height="17%" fill="url(#storyUpGradient)" />
</svg>
`;
};

// Шаблон текста для сториса снизу
export const createStoryDownTextSvg = (fixedSize, firstText, secondText) => {
    return `
<svg width="${fixedSize}" height="${fixedSize + 300}">
  ${fontFaceStyle}
  <text x="50" y="${
      fixedSize + 160
  }" font-family="Century Gothic" font-size="70" fill="white" text-anchor="start">${firstText}</text>
  <text x="50" y="${
      fixedSize + 260
  }" font-family="Century Gothic" font-size="70" fill="white" text-anchor="start">${secondText}</text>
</svg>
`;
};

// Шаблон градиента для поста
export const createGradientSvg = (fixedSize) => {
    return `
    <svg width="${fixedSize}" height="${fixedSize}">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: rgba(25, 91, 108, 0); stop-opacity: 1" />
          <stop offset="100%" style="stop-color: rgba(25, 91, 108, 1); stop-opacity: 1" />
        </linearGradient>
      </defs>
      <rect x="0" y="72%" width="100%" height="28%" fill="url(#gradient1)" />
    </svg>
  `;
};

// Шаблон текста для поста
export const createTextSvg = (fixedSize, firstText, secondText) => {
    return `
    <svg width="${fixedSize}" height="${fixedSize}">
      ${fontFaceStyle}
      <text x="50%" y="${
          fixedSize - 150
      }" font-family="Century Gothic" font-size="75" fill="white" text-anchor="middle">${firstText}</text>
      <text x="50%" y="${
          fixedSize - 40
      }" font-family="Century Gothic" font-size="75" fill="white" text-anchor="middle">${secondText}</text>
    </svg>
  `;
};
