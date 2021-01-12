import { useRef, useCallback } from 'react';
import { endOfDay, isAfter, isBefore } from 'date-fns';
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
      const date = endOfDay(value);
      const { offsetDate, isSame } = generateDate;
      const [start, end] = selected;

      if (disabledDateRef.current?.(date, type)) {
        return true;
      }

      if (start && !end) {
        return (
          (!isSame(date, start) && isBefore(date, start)) ||
          (!!dateSpan && isAfter(date, offsetDate(start, dateSpan - 1)))
        );
      }
      return false;
    },
    [disabledDateRef, dateSpan, generateDate, selected]
  );
  return disabledCombinedDate;
}
