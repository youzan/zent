let nowDate = new Date();
nowDate.setHours(0);
nowDate.setMinutes(0);
nowDate.setSeconds(0);

export const NOW = Number(nowDate);
export const NOWDATE = Number(new Date());
export const ONE_DAY = 1000 * 60 * 60 * 24;
export const TOMORROW = NOW + ONE_DAY;
