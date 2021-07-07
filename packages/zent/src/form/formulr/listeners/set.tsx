import { useMemo } from 'react';
import { asapScheduler, merge } from 'rxjs';
import { filter, observeOn } from 'rxjs/operators';
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
      parent: model,
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

/**
 * Because `FieldSetModel.prototype.registerChild` will be
 * called inside `useMemo`, consume at next micro task queue
 * to avoid react warning below.
 *
 * Cannot update a component from inside the function body
 * of a different component.
 */
export function getFieldSetChildChangeObservable(
  fieldSet: FieldSetModel,
  name: string
) {
  const $ = merge(fieldSet.childRegister$, fieldSet.childRemove$).pipe(
    observeOn(asapScheduler),
    filter(change => change === name)
  );
  return $;
}
