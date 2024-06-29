export const calculateAge = (birthDate) => {
  if (!birthDate) return "";
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const japaneseDateFormat = (date, spacer = "　") => {
  return [
    `${date.getFullYear()}年`,
    `${String(date.getMonth() + 1).padStart(2, "0")}月`,
    `${String(date.getDate()).padStart(2, "0")}日`,
  ].join(spacer);
};

export const fillArray = (emptyRow, array, n) => {
  const currentLength = array.length;
  const rowsToAdd = n - currentLength;

  if (rowsToAdd > 0) {
    return [...array, ...Array(rowsToAdd).fill(emptyRow)];
  }

  return array;
};

export const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  const yearsStr = years > 0 ? `${years}年` : "";
  const monthsStr = months > 0 ? `${months}ヶ月` : "";
  return yearsStr.concat(monthsStr);
};

export const formatDateRange = (startDate, endDate) => {
  const start = startDate.replace("-", "年") + "月";
  const end = endDate ? endDate.replace("-", "年") + "月" : "現在";
  return `<span class="nobreak">${start}～</span><br /><span class="nobreak">${end}</span>`;
};
