import * as React from 'react';
import { CommonDateMap } from '../utils/dateUtils';
import { IGenerateDateConfig, RangeType } from '../types';

const pickerTypeMap = {
  combined: 'combined',
  range: 'range',
};
const { isAfter, isBefore } = CommonDateMap;
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
  selected: [Date, Date];
  disabledDate: (date: Date, type?: RangeType) => boolean;
  generateDate: IGenerateDateConfig;
  pickerType: keyof typeof pickerTypeMap;
}) {
  const IsRangePicker = React.useMemo(
    () => pickerType === pickerTypeMap.range,
    [pickerType]
  );
  const IsCombinedPicker = React.useMemo(
    () => pickerType === pickerTypeMap.combined,
    [pickerType]
  );

  const disabledStartDate = React.useCallback(
    (type: RangeType) => date => {
      const [start, end] = selected;
      const { isSame } = generateDate;
      if (disabledDate?.(date, type)) {
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
    [selected, generateDate, IsRangePicker, IsCombinedPicker, disabledDate]
  );

  const disabledEndDate = React.useCallback(
    (type: RangeType) => date => {
      const { circleEndDate, isSame } = generateDate;
      const [start] = selected;
      if (disabledDate?.(date, type)) {
        return true;
      }

      if (IsRangePicker && start) {
        return !isSame(date, start) && isBefore(date, start);
      }
      if (IsCombinedPicker && start) {
        return isBefore(date, circleEndDate(start));
      }
      return false;
    },
    [selected, generateDate, IsRangePicker, IsCombinedPicker, disabledDate]
  );

  return [disabledStartDate, disabledEndDate];
}
