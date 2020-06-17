import * as React from 'react';
import { generateDateConfig, CommonDateMap } from '../utils/dateUtils';

const pickerTypeMap = {
  combined: 'combined',
  range: 'range',
};
/**
 * 开始、结束日期的disabledDate方法（用于选择范围日期组件的）
 * @param values
 * @param disabledDate
 * @param type
 */
export default function useRangeDisabledDate<DateType>({
  values,
  disabledDate,
  type,
  pickerType,
}: {
  values: [Date, Date];
  disabledDate?: (date: Date) => boolean;
  type: string;
  pickerType: keyof typeof pickerTypeMap;
}) {
  const [start, end] = values;

  const disabledStartDate = React.useCallback(
    date => {
      const IsRangePicker = pickerType === pickerTypeMap.range;
      const IsCombinedPicker = pickerType === pickerTypeMap.combined;
      const { isSame } = generateDateConfig[type];
      if (disabledDate && disabledDate(date)) {
        return true;
      }
      // range-picker
      if (IsRangePicker && end) {
        return !isSame(date, end) && CommonDateMap.isAfter(date, end);
      }
      // combined-picker
      if (IsCombinedPicker && start && !end) {
        return !isSame(date, start) && CommonDateMap.isBefore(date, start);
      }
      return false;
    },
    [start, end, type, disabledDate, pickerType]
  );

  const disabledEndDate = React.useCallback(
    date => {
      const IsCombinedPicker = pickerType === pickerTypeMap.combined;
      const { circleEndDate } = generateDateConfig[type];
      if (disabledDate && disabledDate(date)) {
        return true;
      }
      if (start) {
        return CommonDateMap.isBefore(
          date,
          IsCombinedPicker ? circleEndDate(start) : start
        );
      }
      return false;
    },
    [start, type, disabledDate, pickerType]
  );

  return [disabledStartDate, disabledEndDate];
}
