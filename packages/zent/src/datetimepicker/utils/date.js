/**
 * @author xuhong <chenxuhong@youzan.com>
 */

export function dayStart(date) {
  const now = date || new Date();
  return setTime(now);
}

export function dayEnd(date) {
  const now = date || new Date();
  return setTime(now, '23:59:59');
}

export function setTime(date, time = '00:00:00') {
  let timeArr;
  if (time instanceof Date) {
    timeArr = [time.getHours(), time.getMinutes(), time.getSeconds()];
  } else {
    timeArr = time.split(':');
  }

  const dateTimeArr = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    ...timeArr
  ];
  return new Date(...dateTimeArr);
}

export function getSeasonFromDate(date) {
  const month = date.getMonth();

  let season;
  switch (month) {
    case 0:
    case 1:
    case 2:
      season = 0;
      break;
    case 3:
    case 4:
    case 5:
      season = 1;
      break;
    case 6:
    case 7:
    case 8:
      season = 2;
      break;
    case 9:
    case 10:
    case 11:
      season = 3;
      break;
    default:
      break;
  }

  return season;
}
