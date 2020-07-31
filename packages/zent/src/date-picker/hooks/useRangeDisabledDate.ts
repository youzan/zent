import * as React from 'react';
import { isAfter, isBefore } from 'date-fns';
import {
  IGenerateDateConfig,
  RangeType,
  RangeTypeMap,
  DateNullArray,
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
export default function useRangeDisabledDate({
  selected,
  disabledDate,
  generateDate,
  pickerType,
}: {
  selected: DateNullArray;
  disabledDate: (date: Date, type?: RangeType) => boolean;
  generateDate: IGenerateDateConfig;
  pickerType: keyof typeof pickerTypeMap;
}): IDisabledDateFunc[] {
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
      const { isSame } = generateDate;
      if (disabledDateRef.current?.(date, START)) {
        return true;
      }

      if (IsRangePicker && end) {
        return !isSame(date, end) && isAfter(date, end);
      }
      if (IsCombinedPicker && start && !end) {
        return !isSame(date, start) && isBefore(date, start);
      }
      return false;
    },
    [selected, IsRangePicker, IsCombinedPicker, disabledDateRef, generateDate]
  );

  const disabledEndDate = React.useCallback(
    (date: Date) => {
      const { circleEndDate, isSame } = generateDate;
      const [start] = selected;
      if (disabledDateRef.current?.(date, END)) {
        return true;
      }

      if (IsRangePicker && start) {
        return !isSame(date, start) && isBefore(date, start);
      }
      if (IsCombinedPicker && start) {
        return !!circleEndDate && isBefore(date, circleEndDate(start));
      }
      return false;
    },
    [selected, IsRangePicker, IsCombinedPicker, disabledDateRef, generateDate]
  );

  return [disabledStartDate, disabledEndDate];
}
