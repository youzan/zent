import { ReactNode, createContext } from 'react';

export interface IInputContext {
  renderInner: null | ((children: ReactNode) => ReactNode);
}

export const InputContext = createContext<IInputContext>({
  renderInner: null,
});
