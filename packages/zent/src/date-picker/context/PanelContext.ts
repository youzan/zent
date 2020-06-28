import { createContext } from 'react';
import { IDisabledTimes, IShowTime } from '../types';

export interface IPanelContext {
  // date panel
  showTime?: IShowTime;
  disabledTimes?: IDisabledTimes;
  // time panel
  visibleChange?: boolean;
  onHover?: (val: Date) => void;
}

export default createContext<IPanelContext>(null);
