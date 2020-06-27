import * as React from 'react';
import { parse } from 'date-fns';

/**
 * 将字符串转成date类型，便于内部计算
 * @param selected {string}
 * @param format {string}
 */
export function useTimePanelValue(selected: string, format: string) {
  const [panelTime, setPanelTime] = React.useState<Date>(
    parse(selected, format, new Date())
  );
  React.useEffect(() => {
    setPanelTime(parse(selected, format, new Date()));
  }, [selected, format]);

  if (!(panelTime instanceof Date)) {
    throw new Error('Picker Value does not match the `form` Props');
  }
  return { panelTime, setPanelTime };
}
