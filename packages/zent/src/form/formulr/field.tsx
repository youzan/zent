import { useMemo } from 'react';
import {
  FieldModel,
  BasicModel,
  FormStrategy,
  ModelRef,
  isModelRef,
  isFieldModel,
} from './models';
import { useValue$ } from './hooks';
import { IFormContext, useFormContext } from './context';
import { IValidators } from './validate';
import { useDestroyOnUnmount } from './utils';
import { or } from './maybe';
import {
  createModelNotFoundError,
  createUnexpectedModelTypeError,
} from './error';

function isValueFactory<Value>(
  candidate: Value | (() => Value)
): candidate is () => Value {
  return typeof candidate === 'function';
}

function useModelAndChildProps<Value>(
  ctx: IFormContext | null,
  field: FieldModel<Value> | ModelRef<Value, any, FieldModel<Value>> | string,
  defaultValue: Value | (() => Value)
) {
  const model = useMemo(() => {
    let model: FieldModel<Value>;
    if (typeof field === 'string') {
      const { strategy, parent } = ctx ?? {};
      const m = parent.get(field);
      if (strategy === FormStrategy.View) {
        if (!m || !isFieldModel<Value>(m)) {
          const v = or<Value>(
            parent.getPatchedValue(field),
            isValueFactory(defaultValue) ? defaultValue : () => defaultValue
          );
          model = new FieldModel<Value>(v);
          parent.registerChild(field, model as BasicModel<unknown>);
        } else {
          model = m;
        }
      } else {
        if (!m) {
          throw createModelNotFoundError(field);
        } else if (!isFieldModel<Value>(m)) {
          throw createUnexpectedModelTypeError(field, 'FieldModel', m);
        } else {
          model = m;
        }
      }
    } else if (isModelRef<Value, any, FieldModel<Value>>(field)) {
      const m = field.getModel();
      if (!m || !isFieldModel<Value>(m)) {
        const v = or<Value>(field.patchedValue, () =>
          or(
            field.initialValue,
            isValueFactory(defaultValue) ? defaultValue : () => defaultValue
          )
        );
        model = new FieldModel<Value>(v);
        field.setModel(model);
      } else {
        model = m;
      }
    } else {
      model = field;
    }

    return model;
  }, [field, ctx?.parent, ctx?.strategy, ctx?.form]); // eslint-disable-line react-hooks/exhaustive-deps

  return model;
}

/**
 * 获取一个 `Field`。
 *
 * `Model` 模式下传入字符串类型的 `field` 时， `validators` 和 `defaultValue` 均无效。
 *
 * @param field 字段名
 * @param validators 校验函数数组
 * @param defaultValue 默认值
 */
export function useField<Value>(
  field: string | ModelRef<Value, any, FieldModel<Value>>,
  defaultValue: Value | (() => Value),
  validators?: IValidators<Value>
): FieldModel<Value>;

/**
 * 获取一个 `Field`
 *
 * @param field `Field` 对应的 model 对象，用于关联 `Field` 和 model；当 `FormStrategy` 是 `Model` 或渲染 `FieldArray` 的时候才能使用
 */
export function useField<Value>(
  field: FieldModel<Value> | ModelRef<Value, any, FieldModel<Value>>
): FieldModel<Value>;

export function useField<Value>(
  field: FieldModel<Value> | ModelRef<Value, any, FieldModel<Value>> | string,
  defaultValue?: Value | (() => Value),
  validators: IValidators<Value> = []
): FieldModel<Value> {
  const ctx = useFormContext(typeof field !== 'string');
  const model = useModelAndChildProps(ctx, field, defaultValue);
  const { value$, error$ } = model;
  useValue$(value$, value$.getValue());
  useValue$(error$, error$.getValue());

  // Only update validators in View mode
  if (
    ctx?.strategy === FormStrategy.View &&
    (typeof field === 'string' || isModelRef(field))
  ) {
    model.validators = validators;
  }
  useDestroyOnUnmount(field, model, ctx?.parent);
  return model;
}
