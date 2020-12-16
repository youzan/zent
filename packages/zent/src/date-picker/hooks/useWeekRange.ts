import { useState, useEffect } from 'react';
import { IGenerateDateConfig, IWeekOption, DateTuple } from '../types';
/**
 * 获取某天对应的一周的日期范围
 * @param date
 */
export default function useWeekRange(
  dateConfig?: IGenerateDateConfig,
  date?: Date | null,
  options?: IWeekOption
) {
  const [rangeDate, setRangeDate] = useState<DateTuple | null>();

  useEffect(() => {
    const { startDate, endDate } = dateConfig || {};
    const range = date
      ? ([startDate?.(date, options), endDate?.(date, options)] as DateTuple)
      : null;
    setRangeDate(range);
  }, [date, dateConfig, options]);

  return rangeDate as DateTuple;
}
