import { useMemo } from 'react';
import {
  FieldModel,
  BasicModel,
  FormStrategy,
  FieldSetModel,
  FormModel,
  ModelRef,
  isModelRef,
  isFieldModel,
} from './models';
import { useValue$ } from './hooks';
import { useFormContext } from './context';
import { IValidators } from './validate';
import { useDestroyOnUnmount } from './utils';
import { or } from './maybe';
import { UnexpectedFormStrategyError } from './error';

function isValueFactory<Value>(
  candidate: Value | (() => Value)
): candidate is () => Value {
  return typeof candidate === 'function';
}

function useModelAndChildProps<Value>(
  field: FieldModel<Value> | ModelRef<Value, any, FieldModel<Value>> | string,
  parent: FieldSetModel,
  strategy: FormStrategy,
  defaultValue: Value | (() => Value),
  form: FormModel
) {
  const model = useMemo(() => {
    let model: FieldModel<Value>;
    if (typeof field === 'string') {
      if (strategy !== FormStrategy.View) {
        throw UnexpectedFormStrategyError;
      }
      const m = parent.get(field);
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
    /** ignore defaultValue */
  }, [field, parent, strategy, form]); // eslint-disable-line react-hooks/exhaustive-deps

  return model;
}

/**
 * 创建一个 `Field`
 *
 * @param field 字段名，当 `FormStrategy` 是 `View` 的时候才能用字段名
 * @param validators 当 `field` 是字段名的时候，可以传入`validator`
 * @param defaultValue 默认值
 */
export function useField<Value>(
  field: string | ModelRef<Value, any, FieldModel<Value>>,
  defaultValue: Value | (() => Value),
  validators?: IValidators<Value>
): FieldModel<Value>;

/**
 * 创建一个 `Field`
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
  const { parent, strategy, form } = useFormContext();
  const model = useModelAndChildProps(
    field,
    parent,
    strategy,
    defaultValue!,
    form
  );
  const { value$, error$ } = model;
  useValue$(value$, value$.getValue());
  useValue$(error$, error$.getValue());
  if (typeof field === 'string' || isModelRef(field)) {
    model.validators = validators;
  }
  useDestroyOnUnmount(field, model, parent);
  return model;
}
