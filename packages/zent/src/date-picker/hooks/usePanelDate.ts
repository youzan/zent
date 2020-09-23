import * as React from 'react';

/**
 * 获取面板默认位置日期
 * @param defaultPanelDate
 */
export default function usePanelDate(defaultPanelDate: Date) {
  const [panelDate, setPanelDate] = React.useState<Date>(defaultPanelDate);

  React.useEffect(() => {
    setPanelDate(defaultPanelDate);
  }, [defaultPanelDate]);

  return { panelDate, setPanelDate };
}
