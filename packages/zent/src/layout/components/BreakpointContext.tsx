import { createContext } from 'react';

export interface IBreakpointContext {
  breakpoints: string[];
}

export const LayoutBreakpointContext = createContext<IBreakpointContext>({
  breakpoints: [],
});

export default LayoutBreakpointContext;
