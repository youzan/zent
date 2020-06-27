import { createContext } from 'react';
import { IDisabledTimes } from '../types';

export interface IPanelContext {
  // date panel
  showTime?: boolean;
  disabledTimes?: IDisabledTimes;
  // time panel
  visibleChange?: boolean;
  onHover?: (val: Date) => void;
}

export default createContext<IPanelContext>(null);
