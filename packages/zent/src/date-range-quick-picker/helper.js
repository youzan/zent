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

  const startTimeStr = formatDate(startTime, format);
  const endTimeStr = formatDate(endTime, format);

  if (valueType === 'number' || valueType === 'date') {
    const startTimeDate = parseDate(startTimeStr, format);
    const endTimeDate = parseDate(endTimeStr, format);

    return valueType === 'number'
      ? [startTimeDate.getTime(), endTimeDate.getTime()]
      : [startTimeDate, endTimeDate];
  }

  return [startTimeStr, endTimeStr];
}
