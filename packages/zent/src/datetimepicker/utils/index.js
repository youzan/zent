export const CURRENT = new Date();
export const CURRENT_DAY = new Date(
  CURRENT.getFullYear(),
  CURRENT.getMonth(),
  CURRENT.getDate()
);
export const CURRENT_YEAR = CURRENT.getFullYear();
export const CURRENT_MONTH = CURRENT.getMonth();
export const CURRENT_DATE = CURRENT.getDate();
export const ONEDAY = 24 * 60 * 60 * 1000;

export const padLeft = val => {
  return val < 10 ? `0${val}` : val;
};

export const getMonthStr = val => {
  return `${val.getFullYear()}-${padLeft(val.getMonth() + 1)}`;
};

export const getDateStr = val => {
  return `${val.getFullYear()}-${padLeft(val.getMonth() + 1)}-${val.getDate()}`;
};

export const isSameDate = (val, cmp) => {
  return (
    val.getFullYear() === cmp.getFullYear() &&
    val.getMonth() === cmp.getMonth() &&
    val.getDate() === cmp.getDate()
  );
};

export const isSameMonth = (val, cmp) => {
  return (
    val.getFullYear() === cmp.getFullYear() && val.getMonth() === cmp.getMonth()
  );
};

export const isCurrentMonth = val => {
  return val.getMonth() === CURRENT_MONTH;
};

export const isBeforeMonth = (val, cpr) => {
  if (val.getFullYear() < cpr.getFullYear()) {
    return true;
  }
  return (
    val.getFullYear() === cpr.getFullYear() && val.getMonth() < cpr.getMonth()
  );
};

export const isAfterMonth = (val, cpr) => {
  if (val.getFullYear() > cpr.getFullYear()) {
    return true;
  }
  return (
    val.getFullYear() === cpr.getFullYear() && val.getMonth() > cpr.getMonth()
  );
};

export const goDays = (val, diff) => {
  return new Date(val.getTime() + diff * ONEDAY);
};

export const goMonths = (val, diff) => {
  const cp = new Date(val);
  return new Date(cp.getFullYear(), cp.getMonth() + diff, 1);
};

export const goYears = (val, diff) => {
  const cp = new Date(val);
  return new Date(cp.setFullYear(cp.getFullYear() + diff));
};

export const isArray = val => {
  return Array.isArray(val);
};

export const setSameDate = (val, target) => {
  val.setFullYear(target.getFullYear());
  val.setMonth(target.getMonth());
  val.setDate(target.getDate());
  return val;
};
