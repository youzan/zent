import { useState, useMemo, useEffect } from 'react';
import { parseDateRange } from '../utils/index';
import { addMonths } from 'date-fns';
import { IRangeProps, DateNullTuple, DateTuple } from '../types';

const initDate: DateTuple = [new Date(), new Date()];

function createDateRangeWithSingleDate(
  dates: DateNullTuple,
  addMonthNum: number
): DateTuple {
  const [startDate, endDate] = dates;
  const getStartFromEnd = () =>
    endDate ? addMonths(endDate, -addMonthNum) : initDate[0];
  const getEndFromStart = () =>
    startDate ? addMonths(startDate, addMonthNum) : initDate[1];

  return [startDate ?? getStartFromEnd(), endDate ?? getEndFromStart()];
}

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
  const [defaultPanelDate, setDefaultPanelDate] = useState<DateTuple>(initDate);
  // 转换成Date类型value日期，用于重置select
  const parseValue = useMemo<DateNullTuple>(
    () => (value ? parseDateRange(value, format) : [null, null]),
    [value, format]
  );

  // selected
  const [selected, setSelected] = useState<DateNullTuple>(parseValue);
  useEffect(() => {
    setSelected(parseValue);
  }, [parseValue]);

  // defaultPanelDate
  useEffect(() => {
    let initDateRange: DateTuple = initDate;
    // 优先级：select > defaultDate
    if (selected?.[0] || selected?.[1]) {
      initDateRange = createDateRangeWithSingleDate(selected, addMonthNum);
    } else if (defaultDate?.[0] && defaultDate?.[1]) {
      initDateRange = parseDateRange(defaultDate, format) as DateTuple;
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
