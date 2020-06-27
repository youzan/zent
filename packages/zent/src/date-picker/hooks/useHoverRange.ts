import * as React from 'react';
/**
 * 根据选中的开始日期和hover日期，得到hover的范围日期
 * @param selected 选中的日期
 * @param hoverDate hover的日期
 */
export default function useHoverRange(selected: [Date, Date], hoverDate: Date) {
  const [hoverRange, setHoverRange] = React.useState(null);

  React.useEffect(() => {
    const [start, end] = selected;
    if (start && !end && hoverDate) {
      setHoverRange([start, hoverDate]);
    } else {
      setHoverRange(null);
    }
  }, [selected, hoverDate]);

  return hoverRange;
}
