import { endOfDay, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns';

import {
  IDisabledDateFunc,
  IDisabledTime,
  IDisabledTimeOption,
  IRangeDisabledDateFunc,
  RangeType,
  RangeTypeMap,
} from './types';
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

export const disabledTimeWithRange = (
  date: Date,
  range: [Date | null, Date | null]
): IDisabledTimeOption => {
  const [min, max] = range;
  if (min && !max) {
    return disabledTimeWithMin(date, min);
  }
  if (max && !min) {
    return disabledTimeWithMax(date, max);
  }
  const minHour = min.getHours();
  const minMinute = min.getMinutes();
  const minSecond = min.getSeconds();
  const maxHour = max.getHours();
  const maxMinute = max.getMinutes();
  const maxSecond = max.getSeconds();
  const isMinSame = isSameDay(date, min);
  const isMaxSame = isSameDay(date, max);

  return {
    disabledHours: () => {
      const minDisabledHours = isMinSame ? initArray(minHour) : [];
      const maxDisabledHours = isMaxSame ? initRangeArray(maxHour, 23) : [];
      return [...minDisabledHours, ...maxDisabledHours];
    },
    disabledMinutes: hourValue => {
      const minDisabledMinutes =
        isMinSame && hourValue === minHour ? initArray(minMinute) : [];
      const maxDisabledMinutes =
        isMaxSame && hourValue === maxHour ? initRangeArray(maxMinute, 59) : [];
      return [...minDisabledMinutes, ...maxDisabledMinutes];
    },
    disabledSeconds: (hourValue, minuteValue) => {
      const minDisabledSeconds =
        isMinSame && hourValue === minHour && minuteValue === minMinute
          ? initArray(minSecond)
          : [];
      const maxDisabledSeconds =
        isMaxSame && hourValue === maxHour && minuteValue === maxMinute
          ? initRangeArray(maxSecond, 59)
          : [];
      return [...minDisabledSeconds, ...maxDisabledSeconds];
    },
  };
};
export const disabledDateWithRange = (
  range: [Date | null, Date | null]
): IDisabledDateFunc => {
  const [min, max] = range;
  return (date: Date) =>
    (!!min && isBefore(endOfDay(date), min)) ||
    (!!max && isAfter(startOfDay(date), max));
};

export const getDisabledDateAndTimeWithRangeProps = (
  range: [Date | null, Date | null]
): { disabledDate: IRangeDisabledDateFunc; disabledTime: IDisabledTime } => {
  const [min, max] = range;
  return {
    disabledDate: disabledDateWithRange(range),
    disabledTime: (date: Date, type: RangeType) =>
      type === RangeTypeMap.START
        ? disabledTimeWithMin(date, min)
        : disabledTimeWithMax(date, max),
  };
};
