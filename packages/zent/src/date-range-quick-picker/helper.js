import formatDate from 'zan-utils/date/formatDate';
import { NOW, TOMORROW, ONE_DAY, NOWDATE } from './constants';

export function calculateTime(format, chooseDays, valueType) {
  let startTime;
  let endTime;

  if (Array.isArray(chooseDays)) {
    startTime = chooseDays[0];
    endTime = chooseDays[1];
  } else {
    if (chooseDays > 1) {
      startTime = NOW - (chooseDays - 1) * ONE_DAY;
    } else {
      startTime = NOW - chooseDays * ONE_DAY;
    }
  
    if (chooseDays === 0) {
      endTime = TOMORROW - 1000;
    } else if (chooseDays === 1) {
      endTime = NOW - 1000;
    } else {
      endTime = NOWDATE;
    }
  }

  const startTimeRes = formatDate(startTime, format);
  const endTimeRes = formatDate(endTime, format);

  if (valueType === 'number') {
    return [startTime, endTime];
  }
  return [startTimeRes, endTimeRes];
}
