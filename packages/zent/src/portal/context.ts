import PurePortal from './PurePortal';
import { createContext } from 'react';

export interface IPortalContext {
  /**
   * Array is faster than Set according to perf
   */
  children: PurePortal[];
}

export const PortalContext = createContext<IPortalContext>({
  children: [],
});
