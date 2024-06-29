import { generateRirekisho } from "./rirekisho.js";
import { generateShokumuKeirekisho } from "./keirekisho.js";
import { getStyles } from "./styles.js";

const render = (resume) => {
  return `
    <!DOCTYPE html>
    <html lang="ja">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>履歴書 - ${resume.basics?.name || ""}</title>
      <style>
        ${getStyles()}
      </style>
    </head>

    <body>
      <div class="container">
        ${generateRirekisho(resume)}
        <div class="page-break"></div>
        ${generateShokumuKeirekisho(resume)}
      </div>
    </body>
    </html>
  `;
};

export { render };
