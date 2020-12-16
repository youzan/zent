import { useMemo } from 'react';
import FormContext, { IFormContext, useFormContext } from '../context';
import { FieldSetModel, isFieldSetModel } from '../models';
import { useModelFromContext } from './use-model';

export interface IFieldSetValueProps {
  name?: string;
  model?: FieldSetModel;
  children?: React.ReactNode;
}

/**
 * 根据 `name` 订阅 `FieldSet` 的值
 */
export function FieldSetValue({
  name,
  model: modelProps,
  children,
}: IFieldSetValueProps) {
  const ctx = useFormContext();
  const model = useModelFromContext(ctx, name, modelProps, isFieldSetModel);
  const childContext = useMemo<IFormContext>(
    () => ({
      ...ctx,
      parent: model!,
    }),
    [ctx, model]
  );
  if (model) {
    return (
      <FormContext.Provider key={model.id} value={childContext}>
        {children}
      </FormContext.Provider>
    );
  }
  return null;
}
