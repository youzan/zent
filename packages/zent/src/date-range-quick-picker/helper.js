import isArray from 'lodash/isArray';
import formatDate from 'zan-utils/date/formatDate';
import getValidDate from 'zan-utils/date/getValidDate';
import { NOW, TOMORROW, ONE_DAY, NOWDATE } from './constants';

export function calculateTime(format, choosedItem, valueType) {
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

  // 转换为 date
  const startTimeDate = getValidDate(startTime);
  const endTimeDate = getValidDate(endTime);

  if (valueType === 'date') {
    // 返回 Date
    return [startTimeDate, endTimeDate];
  } else if (valueType === 'number') {
    // 返回时间戳
    return [startTimeDate.getTime(), endTimeDate.getTime()];
  }

  // 返回格式化字符串
  const startTimeRes = formatDate(startTimeDate, format);
  const endTimeRes = formatDate(endTimeDate, format);
  return [startTimeRes, endTimeRes];
}
