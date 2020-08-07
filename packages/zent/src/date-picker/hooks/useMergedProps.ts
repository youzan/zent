import * as React from 'react';
import { parseDate, parseBase } from '../utils/index';
import { SingleDate } from '../types';
const current = new Date();
/**
 * merge from props
 * used by SinglePicker
 * @param value {SingleDate}
 * @param format {string}
 */
export default function useMergedProps({
  value,
  format,
  defaultDate,
}: {
  format: string;
  value?: SingleDate;
  defaultDate?: SingleDate;
}) {
  // defaultPanelDate
  const [defaultPanelDate, setDefaultPanelDate] = React.useState<Date>(current);

  // 转换成Date类型value日期，用于重置select
  const parseValue = React.useMemo(() => parseDate(format, value), [
    value,
    format,
  ]);
  // selected
  const [selected, setSelected] = React.useState<Date | null>(parseValue);
  React.useEffect(() => {
    setSelected(parseValue);
  }, [parseValue]);

  // defaultPanelDate
  React.useEffect(() => {
    const dateValue = selected || defaultDate;
    // 优先级：select > defaultDate
    setDefaultPanelDate(dateValue ? parseBase(dateValue, format) : current);
  }, [defaultDate, selected, value, format]);

  return {
    selected,
    parseValue,
    setSelected,
    defaultPanelDate,
  };
}
