import { createContext } from 'react';

export interface IBreakpointContext {
  breakpoints: string[];
}

const BreakpointContext = createContext<IBreakpointContext>({
  breakpoints: [],
});

export default BreakpointContext;
