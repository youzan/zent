import * as React from 'react';
import { CommonDateMap } from '../utils/dateUtils';
import { IGenerateDateConfig } from '../types';

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
export default function useRangeDisabledDate<DateType>({
  values,
  disabledDate,
  generateDateConfig,
  pickerType,
}: {
  values: [Date, Date];
  disabledDate?: (date: Date) => boolean;
  generateDateConfig: IGenerateDateConfig;
  pickerType: keyof typeof pickerTypeMap;
}) {
  const [start, end] = values;
  const disabledStartDate = React.useCallback(
    date => {
      const IsRangePicker = pickerType === pickerTypeMap.range;
      const IsCombinedPicker = pickerType === pickerTypeMap.combined;
      const { isSame } = generateDateConfig;
      if (disabledDate?.(date)) {
        return true;
      }
      // range-picker
      if (IsRangePicker && end) {
        return !isSame(date, end) && isAfter(date, end);
      }
      // combined-picker
      if (IsCombinedPicker && start && !end) {
        return !isSame(date, start) && isBefore(date, start);
      }
      return false;
    },
    [start, end, generateDateConfig, disabledDate, pickerType]
  );

  const disabledEndDate = React.useCallback(
    date => {
      const IsCombinedPicker = pickerType === pickerTypeMap.combined;
      const { circleEndDate } = generateDateConfig;
      if (disabledDate?.(date)) {
        return true;
      }
      if (start) {
        return isBefore(date, IsCombinedPicker ? circleEndDate(start) : start);
      }
      return false;
    },
    [start, generateDateConfig, disabledDate, pickerType]
  );

  return [disabledStartDate, disabledEndDate];
}
