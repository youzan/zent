import formatDate from 'zan-utils/date/formatDate';
import { NOW, TOMORROW, ONE_DAY } from './constants';

export function calculateTime(format, chooseDays) {
  const startTime = formatDate(NOW - chooseDays * ONE_DAY, format);
  const endTime = formatDate(
    (chooseDays === 0 ? TOMORROW : NOW) - 1000,
    format
  );
  return [startTime, endTime];
}
