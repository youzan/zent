import { createContext } from 'react';
import { Validations } from './utils';

export interface IFormContext {
  validations: Validations<unknown>;
  children: unknown[];
}

export const FormContext = createContext<IFormContext | null>(null);
