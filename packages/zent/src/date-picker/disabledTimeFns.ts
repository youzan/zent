import { isSameDay } from 'date-fns';
import { IDisabledTimeOption } from './types';

const initArray = (targetNum: number) => {
  return Array.from({ length: targetNum }, (_, index) => index);
};

const initRangeArray = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, index) => end - index);
};

export const disabledTimeWithMin = (
  date: Date,
  min: Date
): IDisabledTimeOption => {
  const hour = min.getHours();
  const minute = min.getMinutes();
  const second = min.getSeconds();
  const isSame = isSameDay(date, min);
  return isSame
    ? {
        disabledHours: () => initArray(hour),
        disabledMinutes: hourValue =>
          hourValue === hour ? initArray(minute) : [],
        disabledSeconds: (hourValue, minuteValue) =>
          hourValue === hour && minuteValue === minute ? initArray(second) : [],
      }
    : {};
};

export const disabledTimeWithMax = (
  date: Date,
  max: Date
): IDisabledTimeOption => {
  const hour = max.getHours();
  const minute = max.getMinutes();
  const second = max.getSeconds();
  const isSame = isSameDay(date, max);
  return isSame
    ? {
        disabledHours: () => initRangeArray(hour, 23),
        disabledMinutes: hourValue =>
          hourValue === hour ? initRangeArray(minute, 59) : [],
        disabledSeconds: (hourValue, minuteValue) =>
          hourValue === hour && minuteValue === minute
            ? initRangeArray(second, 59)
            : [],
      }
    : {};
};
