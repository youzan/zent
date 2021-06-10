import { createContext, useContext } from 'react';
import { FormStrategy, FormModel, FieldSetModel } from './models';
import { FormContextNotFoundError } from './error';

export interface IFormContext {
  strategy: FormStrategy;
  form: FormModel<any>;
  parent: FieldSetModel;
}

export const FormContext = createContext<IFormContext | null>(null);

FormContext.displayName = 'FormContext';

export const FormProvider = FormContext.Provider;

/**
 * Returns current form context
 * @param quiet Don't throw if context not found
 */
export function useFormContext(quiet = false): IFormContext | null {
  const ctx = useContext(FormContext);
  if (ctx === null && !quiet) {
    throw FormContextNotFoundError;
  }
  return ctx;
}

export default FormContext;
