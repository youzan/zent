import { createContext } from 'react';

export interface ICheckboxContext<Value> {
  value: Value[];
  disabled: boolean;
  readOnly: boolean;
  isValueEqual: (a: Value, b: Value) => boolean;
  onChange(value: Value): void;
}

export default createContext<ICheckboxContext<any> | null>(null);
