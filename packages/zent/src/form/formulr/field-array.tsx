import { useMemo } from 'react';
import {
  FieldArrayModel,
  FormStrategy,
  FieldSetModel,
  ModelRef,
  isModelRef,
  isFieldArrayModel,
} from './models';
import { useFormContext } from './context';
import { useDestroyOnUnmount } from './utils';
import { isSome, get } from './maybe';
import { IValidators } from './validate';
import { IModel } from './models/base';
import {
  createModelNotFoundError,
  createUnexpectedModelTypeError,
} from './error';
import { useObservableEagerState } from 'observable-hooks';

export type IUseFieldArray<Item, Child extends IModel<Item>> = [
  Child[],
  FieldArrayModel<Item, Child>
];

function useArrayModel<Item, Child extends IModel<Item>>(
  field:
    | string
    | FieldArrayModel<Item, Child>
    | ModelRef<readonly Item[], any, FieldArrayModel<Item, Child>>,
  parent: FieldSetModel,
  strategy: FormStrategy,
  defaultValue: readonly Item[]
) {
  const model = useMemo(() => {
    let model: FieldArrayModel<Item, Child>;
    if (typeof field === 'string') {
      const m = parent.get(field);
      if (strategy === FormStrategy.View) {
        if (!m || !isFieldArrayModel<Item, Child>(m)) {
          const potential = parent.getPatchedValue(field);
          let v = defaultValue;
          if (isSome(potential)) {
            const inner = get(potential);
            if (Array.isArray(inner)) {
              v = inner;
            }
          }
          model = new FieldArrayModel<Item, Child>(null, v);
          parent.registerChild(field, model);
        } else {
          model = m;
        }
      } else {
        if (!m) {
          throw createModelNotFoundError(field);
        } else if (!isFieldArrayModel<Item, Child>(m)) {
          throw createUnexpectedModelTypeError(field, 'FieldArrayModel', m);
        } else {
          model = m;
        }
      }
    } else if (
      isModelRef<ReadonlyArray<Item>, any, FieldArrayModel<Item, Child>>(field)
    ) {
      const m = field.getModel();
      if (!m || !isFieldArrayModel(m)) {
        let v = defaultValue;
        if (isSome(field.patchedValue)) {
          const inner = get(field.patchedValue);
          if (Array.isArray(inner)) {
            v = inner;
          }
        } else if (isSome(field.initialValue)) {
          const inner = get(field.initialValue);
          if (Array.isArray(inner)) {
            v = inner;
          }
        }
        model = new FieldArrayModel(null, v);
      } else {
        model = m;
      }
    } else {
      model = field;
    }
    return model;
    /** ignore defaultValue */
  }, [field, parent, strategy]); // eslint-disable-line react-hooks/exhaustive-deps

  return model;
}

/**
 * 创建一个 `FieldArray`
 *
 * `Model` 模式下传入字符串类型的 `field` 时， `validators` 和 `defaultValue` 均无效。
 *
 * @param field 字段名
 * @param validators 校验函数数组
 * @param defaultValue 默认值
 */
export function useFieldArray<Item, Child extends IModel<Item>>(
  field: string | ModelRef<readonly Item[], any, FieldArrayModel<Item, Child>>,
  validators?: IValidators<readonly (Item | null)[]>,
  defaultValue?: Item[]
): FieldArrayModel<Item, Child>;

/**
 * 创建一个 `FieldArray`
 *
 * @param field `FieldArray` 对应的 model 对象，用于关联 `FieldArray` 和 model；当 `FormStrategy` 是 `Model` 的时候才能用
 */
export function useFieldArray<Item, Child extends IModel<Item>>(
  field: FieldArrayModel<Item, Child>
): FieldArrayModel<Item, Child>;

export function useFieldArray<Item, Child extends IModel<Item>>(
  field:
    | string
    | FieldArrayModel<Item, Child>
    | ModelRef<readonly Item[], any, FieldArrayModel<Item, Child>>,
  validators: IValidators<readonly Item[]> = [],
  defaultValue: readonly Item[] = []
): FieldArrayModel<Item, Child> {
  const { parent, strategy } = useFormContext(typeof field !== 'string') ?? {};
  const model = useArrayModel(field, parent, strategy, defaultValue);

  // Only update validators in View mode
  if (
    strategy === FormStrategy.View &&
    (typeof field === 'string' || isModelRef(field))
  ) {
    model.validators = validators;
  }

  /**
   * ignore returned value
   * user can get the value from model
   */
  useObservableEagerState(model.children$);
  useObservableEagerState(model.error$);

  useDestroyOnUnmount(field, model, parent);

  return model;
}
