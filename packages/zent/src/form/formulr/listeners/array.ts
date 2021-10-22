import { useFormContext } from '../context';
import { FieldArrayModel, IModel, isFieldArrayModel } from '../models';
import { useModelFromContext } from './use-model';
import { useObservableState } from 'observable-hooks';
import { NEVER } from 'rxjs';

/**
 * 根据 `name` 或者 `model` 订阅 `FieldArray` 的更新
 */
export function useFieldArrayChildModels<Item, Child extends IModel<Item>>(
  field: string | FieldArrayModel<Item, Child>
): Child[] | null {
  const ctx = useFormContext(typeof field !== 'string');
  const model = useModelFromContext(
    ctx,
    field as string | undefined,
    field as FieldArrayModel<Item, Child> | undefined,
    isFieldArrayModel
  );

  return useObservableState(model?.children$ ?? NEVER) as Child[] | null;
}
