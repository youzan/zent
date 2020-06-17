import * as React from 'react';
import { generateDateConfig } from '../utils/dateUtils';
import { IPickerType } from '../types';
/**
 * 获取某天对应的一周的日期范围
 * @param date
 */
export default function useWeekRange(
  date: Date,
  type: IPickerType,
  options?: object
) {
  const [rangeDate, setRangeDate] = React.useState<Date[]>(null);

  React.useEffect(
    () => {
      const { startDate, endDate } = generateDateConfig.week;
      const range = [startDate(date, options), endDate(date, options)];
      setRangeDate(date ? range : null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date]
  );

  return type === 'week' ? (rangeDate as [Date, Date]) : null;
}
