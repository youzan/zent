import { useState, useEffect } from 'react';
import { DateTuple, DateNullTuple } from '../types';
/**
 * 根据选中的开始日期和hover日期，得到hover的范围日期
 * @param selected 选中的日期
 * @param hoverDate hover的日期
 */
export default function useHoverRange(
  selected: DateNullTuple,
  hoverDate?: Date
) {
  const [hoverRange, setHoverRange] = useState<DateTuple | null>(null);

  useEffect(() => {
    const [start, end] = selected;
    // 只选中开始日期，hover结束日期时生效
    if (start && !end && hoverDate) {
      setHoverRange([start, hoverDate]);
    } else {
      setHoverRange(null);
    }
  }, [selected, hoverDate]);

  return hoverRange;
}
