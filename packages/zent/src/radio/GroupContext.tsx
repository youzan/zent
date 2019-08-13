import { createContext } from 'react';
import { IRadioEvent } from './AbstractRadio';

export interface IRadioContext<Value> {
  value: unknown;
  isValueEqual(a: unknown, b: unknown): boolean;
  disabled: boolean;
  readOnly: boolean;
  onRadioChange: ((e: IRadioEvent<Value>) => void) | null | undefined;
}

const context = createContext<IRadioContext<any>>({
  value: [],
  disabled: false,
  readOnly: false,
  isValueEqual: Object.is,
  onRadioChange: null,
});

context.displayName = 'RadioGroupContext';

export default context;
