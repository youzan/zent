import * as React from 'react';
import { parseDateRange } from '../utils/index';
import { addMonths } from 'date-fns';
import { IRangeProps, DateNullArray, DateArray } from '../types';

function createDateRangeWithSingleDate(
  dates: DateNullArray,
  addMonthNum: number
): DateArray {
  const [startDate, endDate] = dates;
  const getStartFromEnd = () =>
    endDate ? addMonths(endDate, -addMonthNum) : initDate[0];
  const getEndFromStart = () =>
    startDate ? addMonths(startDate, addMonthNum) : initDate[1];

  return [startDate ?? getStartFromEnd(), endDate ?? getEndFromStart()];
}
const initDate: DateArray = [new Date(), new Date()];

interface IRangeMergedPropsParams
  extends Pick<IRangeProps, 'value' | 'defaultDate'> {
  format: string;
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
  const [defaultPanelDate, setDefaultPanelDate] = React.useState<DateArray>(
    initDate
  );
  // 转换成Date类型value日期，用于重置select
  const parseValue = React.useMemo<DateNullArray>(
    () => (value ? parseDateRange(value, format) : [null, null]),
    [value, format]
  );

  // selected
  const [selected, setSelected] = React.useState<DateNullArray>(parseValue);
  React.useEffect(() => {
    setSelected(parseValue);
  }, [parseValue]);

  // defaultPanelDate
  React.useEffect(() => {
    let initDateRange: DateArray = initDate;
    // 优先级：select > defaultDate
    if (selected?.[0] || selected?.[1]) {
      initDateRange = createDateRangeWithSingleDate(selected, addMonthNum);
    } else if (defaultDate?.[0] && defaultDate?.[1]) {
      initDateRange = parseDateRange(defaultDate, format) as DateArray;
    }

    setDefaultPanelDate(initDateRange);
  }, [defaultDate, selected, format, addMonthNum]);

  return {
    selected,
    parseValue,
    setSelected,
    defaultPanelDate,
    setDefaultPanelDate,
  };
}
