import { japaneseDateFormat, calculateDuration, formatDateRange } from "./utils.js";

export const generateShokumuKeirekisho = (resume) => {
  const { basics, work, skills, strengths, certificates, pr } = resume;

  return `
    <div class="shokumu-keirekisho">
      <h1>職務経歴書</h1>
      <div class="date-name">
        ${japaneseDateFormat(new Date(), "")}<br />
        ${basics.name}
      </div>

      <section class="no-page-break">
        <h2>【職歴要約】</h2>
        ${generateCareerSummary(work)}
      </section>

      <section class="no-page-break">
        <h2>【経験・スキル】</h2>
        <div class="skills-grid">
          ${generateSkillsSummary(skills)}
        </div>
      </section>

      <section>
        <h2>【職務経歴】</h2>
        ${generateDetailedWorkHistory(work)}
      </section>

      <section class="no-page-break">
        <h2>【資格・特技】</h2>
        ${generateCertificatesList(certificates)}
      </section>

      <section class="no-page-break">
        <h2>【活かせる経験・知識・技術等】</h2>
        ${generateStrengths(strengths)}
      </section>

      <section class="no-page-break">
        <h2>【自己PR】</h2>
        ${generateSelfPR(pr)}
      </section>
    </div>
  `;
};

const generateCareerSummary = (work) => {
  return work
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(job => `
    ${job.name}にて${job.position}として${calculateDuration(job.startDate, job.endDate)}勤務。
    ${job.summary}<br />
  `).join("");
};

const generateSkillsSummary = (skills) => {
  return skills.filter(skill => skill.featured)
    .map(skill => `
    <div>
      <h3>◎${skill.name}</h3>
      <ul>
        ${skill.keywords.slice(0, 4).map((keyword) => `<li>${keyword}</li>`).join("")}
      </ul>
    </div>
  `).join('');
};

const generateDetailedWorkHistory = (work) => {
  return work.sort((a, b) => new Date(b.date) - new Date(a.date)).map(job => `
    <div class="job">
      <h3>${job.name}</h3>
      事業内容：${job.summary}
      <table>
        <tr>
          <th class="kikan">期間</th>
          <th>業務内容</th>
        </tr>
        <tr>
          <td class="kikan">${formatDateRange(job.startDate, job.endDate)}</td>
          <td>
            ${job.position}<br />
            <ul>
              ${job.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
          </td>
        </tr>
      </table>
    </div>
  `).join("");
};

const generateCertificatesList = (certificates) => {
  return certificates.filter(cert => cert.featured)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(cert => `${cert.name} ${cert.score || ''} (${cert.date})<br/>`)
    .join("");
};

const generateStrengths = (strengths) => {
  return strengths.map((strength) => `${strength}<br />`).join("");
};

const generateSelfPR = (pr) => {
  return pr.map((row) => `${row}<br />`).join("");
};
