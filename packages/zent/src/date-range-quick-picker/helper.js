import formatDate from 'zan-utils/date/formatDate';
import { NOW, ONE_DAY } from './constants';

export function calculateTime(format, chooseDays) {
  const startTime = chooseDays === 7
    ? formatDate(Number(NOW) - 7 * ONE_DAY, format)
    : formatDate(Number(NOW) - 30 * ONE_DAY, format);
  const endTime = formatDate(Number(NOW) - 1000, format);

  return [startTime, endTime];
}
