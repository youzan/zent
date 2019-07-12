import { createContext } from 'react';
import eq from 'lodash-es/eq';
import { IRadioEvent } from './AbstractRadio';

export interface IRadioContext<Value> {
  value: unknown;
  isValueEqual(a: unknown, b: unknown): boolean;
  disabled: boolean;
  readOnly: boolean;
  onRadioChange: ((e: IRadioEvent<Value>) => void) | null;
}

export default createContext<IRadioContext<any>>({
  value: [],
  disabled: false,
  readOnly: false,
  isValueEqual: eq,
  onRadioChange: null,
});
