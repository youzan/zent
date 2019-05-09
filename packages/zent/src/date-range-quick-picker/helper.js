import isArray from 'lodash/isArray';
import formatDate from 'zan-utils/date/formatDate';
import parseDate from 'zan-utils/date/parseDate';
import { NOW, TOMORROW, ONE_DAY, NOWDATE } from './constants';

export function calculateTime(format, choosedItem, valueType) {
  // 起始时间结果
  let startTime;
  let endTime;

  if (isArray(choosedItem)) {
    [startTime, endTime] = choosedItem;
  } else {
    if (choosedItem > 1) {
      startTime = NOW - (choosedItem - 1) * ONE_DAY;
    } else {
      startTime = NOW - choosedItem * ONE_DAY;
    }

    if (choosedItem === 0) {
      endTime = TOMORROW - 1000;
    } else if (choosedItem === 1) {
      endTime = NOW - 1000;
    } else {
      endTime = NOWDATE;
    }
  }

  // 先format成string
  const startTimeRes = formatDate(startTime, format);
  const endTimeRes = formatDate(endTime, format);

  // 再转换为date
  const startTimeDate = parseDate(startTimeRes, format);
  const endTimeDate = parseDate(endTimeRes, format);

  if (valueType === 'number') {
    // 转时间戳
    return [startTimeDate.getTime(), endTimeDate.getTime()];
  } else if (valueType === 'date') {
    // 转 Date 类型
    return [startTimeDate, endTimeDate];
  }
  return [startTimeRes, endTimeRes];
}
