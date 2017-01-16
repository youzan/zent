export const CURRENT = new Date();
export const CURRENT_DAY = new Date(CURRENT.getFullYear(), CURRENT.getMonth() + 1, CURRENT.getDate());
export const CURRENT_YEAR = CURRENT.getFullYear();
export const CURRENT_MONTH = CURRENT.getMonth();
export const CURRENT_DATE = CURRENT.getDate();
export const ONEDAY = 24 * 60 * 60 * 1000;

const padMonth = (month) => {
  return month < 10 ? `0${month}` : month;
};

export const getMonthStr = (val) => {
  return `${val.getFullYear()}-${padMonth(val.getMonth() + 1)}`;
};

export const getDateStr = (val) => {
  return `${val.getFullYear()}-${padMonth(val.getMonth() + 1)}-${val.getDate()}`;
};

export const isCurrentDate = (val) => {
  return val.getFullYear() === CURRENT_YEAR && val.getMonth() === CURRENT_MONTH && val.getDate() === CURRENT_DATE;
};

export const isCurrentMonth = (val) => {
  return val.getMonth() === CURRENT_MONTH;
};

export const isBeforeMonth = (val, cpr) => {
  if (val.getFullYear() < cpr.getFullYear()) {
    return true;
  }
  return val.getFullYear() === cpr.getFullYear() && val.getMonth() < cpr.getMonth();
};

export const isAfterMonth = (val, cpr) => {
  if (val.getFullYear() > cpr.getFullYear()) {
    return true;
  }
  return val.getFullYear() === cpr.getFullYear() && val.getMonth() > cpr.getMonth();
};

export const goDays = (val, diff) => {
  return new Date(val.getTime() + diff * ONEDAY);
};

export const goMonths = (val, diff) => {
  const cp = new Date(val);
  return new Date(cp.setMonth(cp.getMonth() + diff));
};

export const goYears = (val, diff) => {
  const cp = new Date(val);
  return new Date(cp.setFullYear(cp.getFullYear() + diff));
};

export const padLeft = (val) => {
  return val < 10 ? `0${val}` : val;
};
