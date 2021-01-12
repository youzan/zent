import { useRef, useCallback } from 'react';
import { endOfDay, isAfter, isBefore, startOfDay } from 'date-fns';
import { IGenerateDateConfig, RangeType, DateNullTuple } from '../types';

export default function useDisabledCombinedDate(
  selected: DateNullTuple,
  disabledDate: (date: Date, type?: RangeType) => boolean,
  generateDate: IGenerateDateConfig,
  dateSpan = 0
) {
  const disabledDateRef = useRef(disabledDate);
  disabledDateRef.current = disabledDate;

  const disabledCombinedDate = useCallback(
    (type: RangeType) => (value: Date) => {
      const date = type === 'start' ? endOfDay(value) : startOfDay(value);
      const { offsetDate } = generateDate;
      const [start, end] = selected;

      if (disabledDateRef.current?.(date, type)) {
        return true;
      }

      if (start && !end) {
        const isOutDateSpan =
          !!dateSpan && isAfter(date, offsetDate(start, dateSpan - 1));
        return isBefore(date, start) || (!end && isOutDateSpan);
      }
      return false;
    },
    [disabledDateRef, dateSpan, generateDate, selected]
  );
  return disabledCombinedDate;
}
