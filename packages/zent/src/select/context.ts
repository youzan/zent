import * as React from 'react';
import { ISelectSingleValueProps, ISelectMultiValueProps } from './type';

export interface ISelectCommonContext {
  search: string;
  active: unknown;
  isEqual(a: unknown, b: unknown): boolean;
  onSelect: (value: unknown, e: React.KeyboardEvent | React.MouseEvent) => void;
}

export type ISelectContext = ISelectCommonContext &
  (
    | Required<ISelectSingleValueProps<unknown>>
    | Required<ISelectMultiValueProps<unknown>>);

export const SelectContext = React.createContext<ISelectContext | null>(null);

SelectContext.displayName = 'SelectContext';

export const useSelectContext = (): ISelectContext => {
  const ctx = React.useContext(SelectContext);
  if (ctx === null) {
    throw new Error();
  }
  return ctx;
};
