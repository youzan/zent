import formatDate from '../utils/date/formatDate';
import { NOW, TOMORROW, ONE_DAY, NOWDATE } from './constants';
import { DateRangeQuickPickerValue } from './DateRangeQuickPicker';

export function calculateTime(
  format: string,
  chooseDays,
  valueType
): [DateRangeQuickPickerValue, DateRangeQuickPickerValue] {
  let startTime;
  if (chooseDays > 1) {
    startTime = NOW - (chooseDays - 1) * ONE_DAY;
  } else {
    startTime = NOW - chooseDays * ONE_DAY;
  }

  let endTime;
  if (chooseDays === 0) {
    endTime = TOMORROW - 1000;
  } else if (chooseDays === 1) {
    endTime = NOW - 1000;
  } else {
    endTime = NOWDATE;
  }

  const startTimeRes = formatDate(startTime, format);
  const endTimeRes = formatDate(endTime, format);

  if (valueType === 'number') {
    return [startTime, endTime];
  }
  return [startTimeRes, endTimeRes];
}
