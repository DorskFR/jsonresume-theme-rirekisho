import { calculateAge, fillArray, japaneseDateFormat } from "./utils.js";

export const generateRirekisho = (resume) => {
  const {
    basics,
    certificates,
    education,
    objectives,
    preferences,
    volunteer,
    work,
  } = resume;
  const currentDateJp = japaneseDateFormat(new Date());
  const historyRows = [
    ...generateHistoryRows(generateEducationRows(education), "学歴"),
    ...generateHistoryRows(generateVolunteerRows(volunteer), "インターンシップ・アルバイト"),
    ...generateHistoryRows(generateWorkRows(work), "職歴"),
  ];
  const emptyRowHistory = `
      <tr>
        <td class="year"></td>
        <td class="month"></td>
        <td>&nbsp;</td>
      </tr>
    `;
  const emptyRowPref = `<tr><td>&nbsp</td></tr>`;

  return `
    <table>
    <tr>
      <td class="title">
        <h1>履歴書</h1>
      </td>
      <td class="date">${currentDateJp} 現在</td>
      <td class="picture" rowspan="3">
        ${generateImage(basics)}
      </td>
    </tr>
    <tr>
      <td colspan="2" class="furigana">ふりがな　　${basics.nameFurigana || ""}</td>
    </tr>
    <tr>
      <td colspan="2" class="name">
        <span class="name-title">氏 名</span><br />
        <div class="name-text">${basics.name || ""}</div>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="birthdate">
      <span class="birthdate-title">生年月日</span>
        ${
          basics.birthDate
            ? `${japaneseDateFormat(new Date(basics.birthDate))}生（満　${calculateAge(basics.birthDate)}歳）`
            : "年月日生（満歳）"
        }
      </td>
      <td>
        ※性別 ${generateGender(basics)}
      </td>
    </tr>
  </table>

  <table>
    <tr class="joint">
      <td colspan="2" class="furigana">ふりがな　　${basics.location?.furigana || ""}</td>
      <td rowspan="2" class="telephone">電話 <br /> ${basics.phone || ""}</td>
    </tr>
    <tr>
      <td colspan="2" class="address">
        <span class="address-title">現住所</span> 〒${basics.location?.postalCode || ""}
        <br /><div class="address-text">${generateAddress(basics) || ""}</div>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="furigana">ふりがな　　${basics.alternateContact?.furigana || ""}</td>
      <td rowspan="2" class="telephone">電話 <br /> ${basics.alternateContact?.phone || ""}</td>
    </tr>
    <tr>
      <td colspan="2" class="address">
        <span class="address-title">連絡先</span> 〒${basics.alternateContact?.postalCode || ""}
        <span class="address-note">（現住所以外に連絡を希望する場合に記入）</span><br />
        <div class="address-text">${basics.alternateContact?.address.concat("<br />") || ""}
        E-mail: ${basics.email || ""}<br />
        ${generateProfiles(basics)}
        </div>
      </td>
    </tr>
  </table>

  <table class="tablespace">
    <tr>
      <th class="year">年</th>
      <th class="month">月</th>
      <th>学歴・職歴(名別にまとめて書く)</th>
    </tr>
    ${fillArray(emptyRowHistory, historyRows.slice(0, 15), 15).join("")}
  </table>

  <table>
    <tr>
      <td class="footnote">※「性別」欄：記載は任意です。未記載とすることも可能です</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <table class="tablespace">
    <tr>
      <th class="year">年</th>
      <th class="month">月</th>
      <th>学歴・職歴(名別にまとめて書く)</th>
    </tr>
    ${fillArray(emptyRowHistory, historyRows.slice(15, 23), 8).join("")}
  </table>

  <table>
    <tr class="joint">
      <th class="year">年</th>
      <th class="month">月</th>
      <th>免許・資格</th>
    </tr>
    ${fillArray(emptyRowHistory, generateCertificateRows(certificates).slice(0, 8), 8).join("")}
  </table>

  <table class="tablespace">
    <tr class="section-title">
      <th>志望の動機、特技、好きな学科、アピールポイントなど</th>
    </tr>
    <tr class="objectives">
      <td>${generateObjectives(objectives).join("")}</td>
    </tr>
  </table>

  <table class="tablespace">
    <tr>
      <th class="section-title">本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）</th>
    </tr>
    ${fillArray(emptyRowPref, (preferences || []).map((pref) => `<tr><td>${pref}</td></tr>`).slice(0, 5), 5).join("")}
  </table>
  `;
};

const generateGender = (basics) => {
  if (!basics.gender) return "";
  const genderMap = {
    male: "男",
    female: "女",
  };
  const gender = genderMap[basics.gender] || "";
  return gender ? `<span class="circled">${gender}</span>` : "";
};

const generateImage = (basics) => {
  if (!basics.image)
    return `
  <div class="picture-instructions">
    <span class="picture-instructions-title">写真をはる位置</span>
    写真をはる必要が<br />
    ある場合<br />
    1. 縦　36〜40mm<br />
    &nbsp;&nbsp;&nbsp;&nbsp;横　24〜30mm<br />
    2. 本人単身胸から上<br />
    3. 裏面のりづけ
  </div>`;

  return `<img src="${basics.image}" class="image" />`;
};

const generateAddress = (basics) => {
  if (!basics.location) return "";
  return [
    basics.location?.region,
    basics.location?.city,
    basics.location?.address,
  ].filter(v => v).join("");
}

const generateProfiles = (basics) => {
  if (!basics.profiles || basics.profiles.length === 0) return "";
  return basics.profiles.map((profile) => {
    return `
      ${profile.network.concat(":") || ""} ${profile.url || profile.username || ""}<br />`
  }).join("");
}

const generateHistoryRows = (history, historyType) => {
  if (history.length === 0) return [];
  return [
    `<tr>
      <th class="year"></th>
      <th class="month"></th>
      <th class="history-type">${historyType}</th>
    </tr>`,
    ...history
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((item) => {
        const [year, month] = (item.date || "").split("-");
        return `
        <tr>
          <td class="year">${year || ""}</td>
          <td class="month">${month || ""}</td>
          <td>${item.event || ""}</td>
        </tr>
      `;
      }),
  ];
};

const generateEducationRows = (education) => {
  return [
    ...(education || []).filter((edu) => !edu.inline).map((edu) => ({
      date: edu.startDate,
      event: [edu.location, edu.institution, edu.area, edu.studyType, "入学"]
        .filter((v) => v)
        .join("・"),
    })),
    ...(education || []).map((edu) => ({
      date: edu.endDate,
      event: [edu.location, edu.institution, edu.area, edu.studyType, "卒業"]
        .filter((v) => v)
        .join("・"),
    })),
  ];
};

const generateWorkRows = (work) => {
  return [
    ...(work || []).map((job) => ({
      date: job.startDate,
      event: [
        job.location,
        job.name,
        job.position,
        "入社",
        !job.endDate && "現在に至る",
      ]
        .filter((v) => v)
        .join("・"),
    })),
    ...(work || [])
      .filter((job) => job.endDate)
      .map((job) => ({
        date: job.endDate,
        event: [job.location, job.name, job.position, "退社"]
          .filter((v) => v)
          .join("・"),
      })),
  ];
};

const generateVolunteerRows = (volunteer) => {
  return [
    ...(volunteer || []).map((vol) => ({
      date: vol.startDate,
      event: [vol.location, vol.organization, vol.position, vol.summary]
        .filter((v) => v)
        .join("・"),
    })),
  ];
};

const generateCertificateRows = (certificates) => {
  return (certificates || [])
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((cert) => {
      const [year, month] = (cert.date || "").split("-");
      return `
      <tr>
        <td class="year">${year || ""}</td>
        <td class="month">${month || ""}</td>
        <td>${cert.name || ""} ${cert.score || ""}</td>
      </tr>
    `;
    });
};

const generateObjectives = (objectives) => {
  if (!objectives || objectives.length === 0) return [];
  return objectives.map((obj) => `${obj}<br />`);
};
