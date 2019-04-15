import formatDate from '../utils/date/formatDate';
import { getValidDate } from '../utils/date/helpers';
import { ONE_DAY } from './constants';
import { DatePickers } from '../datetimepicker/common/types';

export function calculateTime(
  format: string,
  choosedItem,
  valueType
): DatePickers.RangeValue {
  let startTime;
  let endTime;

  const today = getToday();
  const tomorrow = today + ONE_DAY;

  if (Array.isArray(choosedItem)) {
    [startTime, endTime] = choosedItem;
  } else {
    if (choosedItem > 1) {
      startTime = today - (choosedItem - 1) * ONE_DAY;
    } else {
      startTime = today - choosedItem * ONE_DAY;
    }

    if (choosedItem === 0) {
      endTime = tomorrow - 1000;
    } else if (choosedItem === 1) {
      endTime = today - 1000;
    } else {
      endTime = Date.now();
    }
  }

  const startTimeDate = getValidDate(startTime);
  const endTimeDate = getValidDate(endTime);

  if (valueType === 'number') {
    return [startTimeDate.getTime(), endTimeDate.getTime()];
  } else if (valueType === 'date') {
    return [startTimeDate, endTimeDate];
  }

  // valueType is string
  const startTimeStr = formatDate(startTimeDate, format);
  const endTimeStr = formatDate(endTimeDate, format);
  return [startTimeStr, endTimeStr];
}

function getToday() {
  const d = new Date();
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.getTime();
}
