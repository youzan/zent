import formatDate from 'zan-utils/date/formatDate';
import { NOW, TOMORROW, ONE_DAY } from './constants';

export function calculateTime(format, chooseDays, valueType) {
  const startTime = NOW - chooseDays * ONE_DAY;
  const startTimeRes = formatDate(startTime, format);

  const endTime = (chooseDays === 0 ? TOMORROW : NOW) - 1000;
  const endTimeRes = formatDate(endTime, format);

  if (valueType === 'number') {
    return [startTime, endTime];
  }
  return [startTimeRes, endTimeRes];
}
