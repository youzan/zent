import * as React from 'react';
import { parse } from 'date-fns';
const current = new Date();
const initTimeDate = new Date(
  current.getFullYear(),
  current.getMonth(),
  current.getDate()
);
/**
 * 将字符串转成date类型，便于内部计算
 * @param selected {string}
 * @param defaultTime {string}
 * @param format {string}
 */
export function useTimePanelValue(
  selected: string,
  defaultTime: string,
  format: string
) {
  const value = selected || defaultTime;
  const [panelTime, setPanelTime] = React.useState<Date>(
    value ? parse(value, format, initTimeDate) : initTimeDate
  );

  React.useEffect(() => {
    setPanelTime(value ? parse(value, format, initTimeDate) : initTimeDate);
  }, [value, defaultTime, format]);

  if (panelTime && !(panelTime instanceof Date)) {
    throw new Error('Picker Value does not match the `form` Props');
  }
  return { panelTime, setPanelTime };
}
