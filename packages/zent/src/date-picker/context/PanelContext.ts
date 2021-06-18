import { createContext } from 'react';
import { IDisabledTime, IShowTime } from '../types';

export interface IPanelContext {
  // date panel
  showTime?: IShowTime;
  onHover?: (val: Date) => void;

  // time panel
  visibleChange?: boolean;
  confirmStatus?: boolean;
  isDisabledCurrent?: boolean;
  disabledTime?: IDisabledTime;
}

export default createContext<IPanelContext>({});
