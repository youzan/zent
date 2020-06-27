import * as React from 'react';
import { IGenerateDateConfig, IWeekOption } from '../types';
/**
 * 获取某天对应的一周的日期范围
 * @param date
 */
export default function useWeekRange(
  date: Date,
  generateDateConfig: IGenerateDateConfig,
  options: IWeekOption
) {
  const [rangeDate, setRangeDate] = React.useState<Date[]>(null);

  React.useEffect(() => {
    const { startDate, endDate } = generateDateConfig;
    const range = [startDate(date, options), endDate(date, options)];
    setRangeDate(date ? range : null);
  }, [date, generateDateConfig, options]);

  return rangeDate as [Date, Date];
}
