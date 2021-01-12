import { useRef, useCallback } from 'react';
import { endOfDay, isAfter, isBefore, startOfDay } from 'date-fns';
import {
  IGenerateDateConfig,
  RangeType,
  RangeTypeMap,
  DateNullTuple,
  IDisabledDateFunc,
} from '../types';

const { START, END } = RangeTypeMap;

/**
 * 开始、结束日期的disabledDate方法（用于选择范围日期组件的）
 * @param values
 * @param disabledDate
 * @param type
 */
export default function useRangeDisabledDate(
  selected: DateNullTuple,
  disabledDate: (date: Date, type?: RangeType) => boolean,
  generateDate: IGenerateDateConfig,
  dateSpan = 0
): IDisabledDateFunc[] {
  const disabledDateRef = useRef(disabledDate);
  disabledDateRef.current = disabledDate;

  const disabledStartDate = useCallback(
    (value: Date) => {
      const date = endOfDay(value);
      const [, end] = selected;
      const { isSame, offsetDate } = generateDate;
      if (disabledDateRef.current?.(date, START)) {
        return true;
      }

      if (end) {
        return (
          (!isSame(date, end) && isAfter(date, end)) ||
          (!!dateSpan && isBefore(date, offsetDate(end, -dateSpan + 1)))
        );
      }

      return false;
    },
    [selected, disabledDateRef, generateDate, dateSpan]
  );

  const disabledEndDate = useCallback(
    (value: Date) => {
      const date = startOfDay(value);
      const { isSame, offsetDate } = generateDate;
      const [start] = selected;
      if (disabledDateRef.current?.(date, END)) {
        return true;
      }
      const isInDateSpan =
        !!dateSpan && isAfter(date, offsetDate(start, dateSpan - 1));

      if (start) {
        return (!isSame(date, start) && isBefore(date, start)) || isInDateSpan;
      }

      return false;
    },
    [selected, disabledDateRef, generateDate, dateSpan]
  );

  return [disabledStartDate, disabledEndDate];
}
