import * as React from 'react';
import { isAfter, isBefore } from 'date-fns';
import {
  IGenerateDateConfig,
  RangeType,
  RangeTypeMap,
  DateNullTuple,
  IDisabledDateFunc,
} from '../types';

const pickerTypeMap = {
  combined: 'combined',
  range: 'range',
};
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
  pickerType: keyof typeof pickerTypeMap,
  dateSpan = 0
): IDisabledDateFunc[] {
  const disabledDateRef = React.useRef(disabledDate);
  disabledDateRef.current = disabledDate;

  const IsRangePicker = React.useMemo(
    () => pickerType === pickerTypeMap.range,
    [pickerType]
  );
  const IsCombinedPicker = React.useMemo(
    () => pickerType === pickerTypeMap.combined,
    [pickerType]
  );

  const disabledStartDate = React.useCallback(
    (date: Date) => {
      const [start, end] = selected;
      const { isSame, offsetDate } = generateDate;
      if (disabledDateRef.current?.(date, START)) {
        return true;
      }

      if (IsRangePicker && end) {
        return (
          (!isSame(date, end) && isAfter(date, end)) ||
          (!!dateSpan && isBefore(date, offsetDate(end, -dateSpan + 1)))
        );
      }
      if (IsCombinedPicker && start && !end) {
        return (
          (!isSame(date, start) && isBefore(date, start)) ||
          (!!dateSpan && isAfter(date, offsetDate(start, dateSpan - 1)))
        );
      }
      return false;
    },
    [
      selected,
      IsRangePicker,
      IsCombinedPicker,
      disabledDateRef,
      generateDate,
      dateSpan,
    ]
  );

  const disabledEndDate = React.useCallback(
    (date: Date) => {
      const { circleEndDate, isSame, offsetDate } = generateDate;
      const [start] = selected;
      if (disabledDateRef.current?.(date, END)) {
        return true;
      }
      const isInDateSpan =
        !!dateSpan && isAfter(date, offsetDate(start, dateSpan - 1));

      if (IsRangePicker && start) {
        return (!isSame(date, start) && isBefore(date, start)) || isInDateSpan;
      }
      if (IsCombinedPicker && start) {
        return (
          (!!circleEndDate && isBefore(date, circleEndDate(start))) ||
          isInDateSpan
        );
      }
      return false;
    },
    [
      selected,
      IsRangePicker,
      IsCombinedPicker,
      disabledDateRef,
      generateDate,
      dateSpan,
    ]
  );

  return [disabledStartDate, disabledEndDate];
}
