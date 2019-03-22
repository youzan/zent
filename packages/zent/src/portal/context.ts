import PurePortal from './PurePortal';
import { createContext } from 'react';

export interface IPortalContext {
  children: Set<PurePortal>;
}

export const PortalContext = createContext<IPortalContext>({
  children: new Set(),
});
