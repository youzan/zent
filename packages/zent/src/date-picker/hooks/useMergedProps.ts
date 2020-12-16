import { useState, useMemo, useEffect } from 'react';
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
  const [defaultPanelDate, setDefaultPanelDate] = useState<Date>(current);

  // 转换成Date类型value日期，用于重置select
  const parseValue = useMemo(() => parseDate(format, value), [value, format]);
  // selected
  const [selected, setSelected] = useState<Date | null>(parseValue);
  useEffect(() => {
    setSelected(parseValue);
  }, [parseValue]);

  // defaultPanelDate
  useEffect(() => {
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
