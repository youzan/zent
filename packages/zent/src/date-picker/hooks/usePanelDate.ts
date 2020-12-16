import { useState, useEffect } from 'react';

/**
 * 获取面板默认位置日期
 * @param defaultPanelDate
 */
export default function usePanelDate(defaultPanelDate: Date) {
  const [panelDate, setPanelDate] = useState<Date>(defaultPanelDate);

  useEffect(() => {
    setPanelDate(defaultPanelDate);
  }, [defaultPanelDate]);

  return { panelDate, setPanelDate };
}
