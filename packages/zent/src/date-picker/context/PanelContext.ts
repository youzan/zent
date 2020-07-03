import { createContext } from 'react';
import { IDisabledTimes, IShowTime } from '../types';

export interface IPanelContext {
  // date panel
  showTime?: IShowTime;
  onHover?: (val: Date) => void;

  // time panel
  visibleChange?: boolean;
  confirmStatus?: boolean;
  disabledTimes?: IDisabledTimes;
}

export default createContext<IPanelContext>(null);
