export const getStyles = () => `
  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    html, body {
      width: 210mm;
      height: 297mm;
    }
    .container {
      width: 190mm;
      height: 277mm;
      margin: 10mm;
      page-break-after: always;
    }
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Hiragino Kaku Gothic Pro", "Mincho MS", "Meiryo", sans-serif;
    font-size: 8pt;
    line-height: 1.3;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    padding: 0px;
  }

  th {
    font-weight: normal;
  }

  th, td {
    border: 1px solid #000;
    padding:6pt;
  }

  .container {
    max-width: 210mm;
    margin: 20pt auto;
  }

  .picture, .title, .date, .footnote  {
    border: 0px;
  }

  .picture {
    width: 120pt;
  }

  .image, .picture-instructions {
    width: 90pt;
    height: 120pt;
    margin-block: 5pt;
    margin-inline: 15pt;
  }

  .picture-instructions {
    border: 1px dotted #000;
    font-size: 8pt;
    padding: 5pt;
  }

  .picture-instructions-title {
    padding: 5pt;
    display: block;
  }

  .birthdate{
    text-align: right;
  }

  .joint > td, .joint > th {
    border-top: 0px;
  }

  .title, .date {
    padding-bottom: 0px;
    vertical-align: bottom;
    width: 50%;
  }

  .title > h1 {
    padding: 0px;
    margin: 0px;
    font-size: 18pt;
    letter-spacing: 15pt;
  }

  .date {
    text-align: right;
  }

  .furigana {
    padding-block: 2pt;
    padding-inline: 5pt;
    margin: 0px;
    font-size: 8pt;
  }

  .birthdate-title {
    float: left;
  }

  .name {
    vertical-align: top;
  }

  .name-title, .section-title, .history-type, .address-title {
    text-align: left;
  }

  .name-title, .birthdate-title, .address-title {
    font-size: 10pt;
  }

  .name-text {
    text-align: center;
    font-size: 16pt;
    margin-bottom: -12pt;
  }

  .year, .month {
    text-align: center;
    vertical-align: center;
  }

  .year {
    width: 12%;
  }

  .month {
    width: 7%;
  }

  .circled {
    border: 1px solid #000;
    border-radius: 100%;
    padding: 3pt;
  }

  .telephone {
    width: 20%;
    vertical-align: top;
  }

  .address {
    height: 60pt;
    vertical-align: top;
  }

  .address-text {
    margin-left: 10%;
  }

  .address-note {
    float: right;
    font-size: 8pt;
  }

  .objectives {
    height: 125pt;
    text-align: left;
    vertical-align: top;
  }

  .tablespace {
    margin-top: 10pt;
  }

  .nobrake {
    white-space: nowrap;
  }

  .kikan {
    width: 100px;
  }

  .shokumu-keirekisho h1,
  .shokumu-keirekisho h2,
  .shokumu-keirekisho h3,
  .shokumu-keirekisho .date-name {
    margin-block: 10pt;
  }

  .shokumu-keirekisho h1 {
    font-size: 18pt;
    text-align: center;
  }

  .shokumu-keirekisho .date-name {
    font-size: 10pt;
    text-align: right;
  }

  .shokumu-keirekisho h2 {
    font-size: 12pt;
    border-bottom: 1px solid #000;
  }

  .shokumu-keirekisho h3 {
    font-size: 10pt;
  }

  .shokumu-keirekisho table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 5pt;
  }

  .shokumu-keirekisho th, .shokumu-keirekisho td {
    border: 1px solid #000;
    padding: 5pt;
  }

  .shokumu-keirekisho th {
    background-color: #f0f0f0;
    font-weight: normal;
    text-align: center;
  }

  .shokumu-keirekisho ul {
    margin: 5pt 0;
    padding-left: 20pt;
  }

  .shokumu-keirekisho .job {
    margin-block: 0;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0rem;
  }

  .skill-category {
    break-inside: avoid;
  }

  @media print {
    .page-break {
      page-break-before: always;
    }

    .no-page-break, .job {
      page-break-inside: avoid;
    }

    h2, h3 {
      page-break-after: avoid;
    }
  }
`;
