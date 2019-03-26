import { createContext } from 'react';
import eq from 'lodash-es/eq';
import { IRadioEvent } from './AbstractRadio';

export interface IRadioContext {
  value: unknown;
  isValueEqual(a: unknown, b: unknown): boolean;
  disabled: boolean;
  readOnly: boolean;
  onRadioChange: ((e: IRadioEvent) => void) | null;
}

export default createContext<IRadioContext>({
  value: [],
  disabled: false,
  readOnly: false,
  isValueEqual: eq,
  onRadioChange: null,
});
