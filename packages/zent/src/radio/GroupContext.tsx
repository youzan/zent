import { createContext } from 'react';
import { IRadioEvent } from './AbstractRadio';

export interface IRadioContext<Value> {
  value: Value | undefined;
  isValueEqual(a: Value | undefined, b: Value | undefined): boolean;
  disabled: boolean;
  readOnly: boolean;
  onRadioChange: ((e: IRadioEvent<Value>) => void) | null | undefined;
}

const context = createContext<IRadioContext<any> | null>(null);

context.displayName = 'RadioGroupContext';

export default context;
