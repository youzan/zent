import * as React from 'react';
import { parseDateRange } from '../utils/index';
import { addMonths, isSameMonth } from 'date-fns';
import { ICommonProps, RangeDate } from '../types';

function createDateRangeWithStart(
  dates: [Date, Date],
  addMonthNum
): [Date, Date] {
  return [
    dates[0],
    dates[1] && !isSameMonth(...dates)
      ? dates[1]
      : addMonths(dates[0], addMonthNum),
  ];
}
const initDate = createDateRangeWithStart([new Date(), new Date()], 0);

interface IRangeMergedPropsParams
  extends Pick<ICommonProps<RangeDate>, 'value' | 'format' | 'defaultDate'> {
  addMonthNum?: number;
}
// range
export default function useRangeMergedProps({
  value,
  format,
  defaultDate,
  addMonthNum = 0,
}: IRangeMergedPropsParams) {
  // defaultPanelDate
  const [defaultPanelDate, setDefaultPanelDate] = React.useState<[Date, Date]>(
    initDate
  );
  // 转换成Date类型value日期，用于重置select
  const parseValue = React.useMemo<[Date, Date]>(
    () => (value ? parseDateRange(value, format) : [null, null]),
    [value, format]
  );

  // selected
  const [selected, setSelected] = React.useState<[Date, Date]>(parseValue);
  React.useEffect(() => {
    setSelected(parseValue);
  }, [parseValue]);

  // defaultPanelDate
  React.useEffect(() => {
    setDefaultPanelDate(
      selected && selected[0]
        ? parseDateRange(
            createDateRangeWithStart(selected, addMonthNum),
            format
          )
        : defaultDate && defaultDate[0] && defaultDate[1]
        ? parseDateRange(defaultDate, format)
        : initDate
    );
  }, [defaultDate, selected, format, addMonthNum]);

  return {
    selected,
    parseValue,
    setSelected,
    defaultPanelDate,
    setDefaultPanelDate,
  };
}
