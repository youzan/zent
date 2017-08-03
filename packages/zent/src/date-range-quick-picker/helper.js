import formatDate from 'zan-utils/date/formatDate';
import { NOW, ONE_DAY } from './constants';

export function calculateTime(format, chooseDays) {
  const startTime = formatDate(Number(NOW) - chooseDays * ONE_DAY, format);
  const endTime = formatDate(Number(NOW) - 1000, format);
  return [startTime, endTime];
}
