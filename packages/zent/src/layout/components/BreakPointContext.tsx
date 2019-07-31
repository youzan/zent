import { createContext } from 'react';
import { LayoutBreakPoint } from './types';

export interface IBreakpointContext {
  breakpoints: Partial<Record<LayoutBreakPoint, boolean>>;
}

export const LayoutBreakpointContext = createContext<
  Partial<Record<LayoutBreakPoint, boolean>>
>({} as Record<LayoutBreakPoint, boolean>);

export default LayoutBreakpointContext;
