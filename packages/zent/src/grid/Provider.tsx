import { ReactNode } from 'react';
import { GridContext } from './Context';
import { IGridContext } from './types';

export interface IGridProviderProps extends IGridContext {
  children: ReactNode;
}

export function GridProvider({
  children,
  isValueEmpty,
  defaultText,
}: IGridProviderProps) {
  return (
    <GridContext.Provider value={{ isValueEmpty, defaultText }}>
      {children}
    </GridContext.Provider>
  );
}
