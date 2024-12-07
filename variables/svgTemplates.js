// Переменная для блока стилей шрифта
const fontStyle = `
  <style>
    @font-face {
      font-family: 'Century Gothic', sans-serif;
      src: url('/centurygothic.ttf') format('truetype');
    }
  </style>
`;

// Шаблон текста для сториса сверху
export const createStoryUpTextSvg = (fixedSize, firstText, secondText) => {
    return `
  <svg width="${fixedSize}" height="${fixedSize + 300}" xmlns="http://www.w3.org/2000/svg">
    ${fontStyle}
    <text x="50" y="${
        fixedSize - 990
    }" font-family="Century Gothic" font-size="70" fill="white" text-anchor="start">${firstText}</text>
    <text x="50" y="${
        fixedSize - 890
    }" font-family="Century Gothic" font-size="70" fill="white" text-anchor="start">${secondText}</text>
  </svg>
  `;
};

// Шаблон текста для сториса снизу
export const createStoryDownTextSvg = (fixedSize, firstText, secondText) => {
    return `
  <svg width="${fixedSize}" height="${fixedSize + 300}" xmlns="http://www.w3.org/2000/svg">
    ${fontStyle}
    <text x="50" y="${
        fixedSize + 160
    }" font-family="Century Gothic" font-size="70" fill="white" text-anchor="start">${firstText}</text>
    <text x="50" y="${
        fixedSize + 260
    }" font-family="Century Gothic" font-size="70" fill="white" text-anchor="start">${secondText}</text>
  </svg>
  `;
};

// Шаблон текста для поста
export const createTextSvg = (fixedSize, firstText, secondText) => {
    return `
  <svg width="${fixedSize}" height="${fixedSize}" xmlns="http://www.w3.org/2000/svg">
    ${fontStyle}
    <text x="50%" y="${
        fixedSize - 150
    }" font-family="Century Gothic" font-size="75" fill="white" text-anchor="middle">${firstText}</text>
    <text x="50%" y="${
        fixedSize - 40
    }" font-family="Century Gothic" font-size="75" fill="white" text-anchor="middle">${secondText}</text>
  </svg>
  `;
};
