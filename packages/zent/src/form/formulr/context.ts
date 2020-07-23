import { createContext, useContext } from 'react';
import { FormStrategy, FormModel, FieldSetModel } from './models';
import { FormulrError } from './error';

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
    throw new FormulrError('FormContext not found', [
      'Using form hooks outside the form context',
      "There's a copy of formulr in your project, run `yarn list formulr` to check",
    ]);
  }
  return ctx;
}

export default FormContext;
