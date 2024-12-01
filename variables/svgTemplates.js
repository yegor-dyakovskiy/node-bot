// src/variables/svgTemplates.js
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

export const createTextSvg = (fixedSize, firstText, secondText) => {
    return `
      <svg width="${fixedSize}" height="${fixedSize}">
        <style>
          @font-face {
            font-family: 'Century Gothic';
            src: url('path_to_century_gothic.ttf') format('truetype');
          }
        </style>
        <text x="50%" y="${
            fixedSize - 370
        }" font-family="Century Gothic" font-size="200" fill="white" text-anchor="middle">${firstText}</text>
        <text x="50%" y="${
            fixedSize - 120
        }" font-family="Century Gothic" font-size="200" fill="white" text-anchor="middle">${secondText}</text>
      </svg>
    `;
};
