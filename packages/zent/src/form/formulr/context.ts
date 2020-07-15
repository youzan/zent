import { createContext, useContext } from 'react';
import { FormStrategy, FormModel, FieldSetModel } from './models';
import { UnexpectedFormContextError } from './error';

export interface IFormContext {
  strategy: FormStrategy;
  form: FormModel<any>;
  parent: FieldSetModel;
}

export const FormContext = createContext<IFormContext | null>(null);

FormContext.displayName = 'FormContext';

export const FormProvider = FormContext.Provider;

export function useFormContext(): IFormContext {
  const ctx = useContext(FormContext);
  if (ctx === null) {
    throw UnexpectedFormContextError;
  }
  return ctx;
}

export default FormContext;
