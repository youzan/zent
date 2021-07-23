import { NEVER } from 'rxjs';
import { useFormContext } from '../context';
import { useValue$ } from '../hooks';
import { FieldArrayModel, IModel, isFieldArrayModel } from '../models';
import { useModelFromContext } from './use-model';

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
  const maybeChildren = useValue$(model?.children$ ?? NEVER, model?.children);

  return maybeChildren as Child[] | null;
}
