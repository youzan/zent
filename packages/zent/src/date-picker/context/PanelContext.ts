import * as React from 'react';
import { IDisabledTimes } from '../types';
export interface IPanelContextProps {
  // date panel
  showTime?: boolean;
  disabledTimes?: IDisabledTimes;

  // time panel
  visibleChange?: boolean;
}

const PanelContext = React.createContext<IPanelContextProps>({});

export default PanelContext;
