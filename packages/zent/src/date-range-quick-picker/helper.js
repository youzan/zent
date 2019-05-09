import formatDate from 'zan-utils/date/formatDate';
import getValidDate from 'zan-utils/date/getValidDate';
import { NOW, TOMORROW, ONE_DAY, NOWDATE } from './constants';

export function calculateTime(format, chooseDays, valueType) {
  let startTime;
  let endTime;

  if (Array.isArray(chooseDays)) {
    [startTime, endTime] = chooseDays;
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
    const st = getValidDate(startTime);
    const et = getValidDate(endTime);
    return [st.getTime(), et.getTime()];
  }
  return [startTimeRes, endTimeRes];
}
