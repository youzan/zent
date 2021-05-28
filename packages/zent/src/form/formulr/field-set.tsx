import { useEffect, useMemo, useState } from 'react';
import { IFormContext, useFormContext } from './context';
import {
  $FieldSetValue,
  BasicModel,
  FieldSetModel,
  FormStrategy,
  isFieldSetModel,
  isModelRef,
  ModelRef,
} from './models';
import { useValue$ } from './hooks';
import { IValidators } from './validate';
import { useDestroyOnUnmount, UnknownFieldSetModelChildren } from './utils';
import { get, isSome, or } from './maybe';
import { UnexpectedFormStrategyError } from './error';
import isPlainObject from '../../utils/isPlainObject';
import { asapScheduler, merge } from 'rxjs';
import { filter, observeOn } from 'rxjs/operators';

export type IUseFieldSet<T extends UnknownFieldSetModelChildren> = [
  IFormContext,
  FieldSetModel<T>
];

function useFieldSetModel<T extends UnknownFieldSetModelChildren>(
  field:
    | string
    | FieldSetModel<T>
    | ModelRef<$FieldSetValue<T>, any, FieldSetModel<T>>,
  parent: FieldSetModel,
  strategy: FormStrategy
) {
  const model = useMemo(() => {
    let model: FieldSetModel<T>;
    if (typeof field === 'string') {
      if (strategy !== FormStrategy.View) {
        throw UnexpectedFormStrategyError;
      }
      const m = parent.get(field);
      if (!m || !isFieldSetModel<T>(m)) {
        model = new FieldSetModel({} as T);
        let v: Partial<$FieldSetValue<T>> = {};
        const potential = parent.getPatchedValue(field);
        if (isSome(potential)) {
          const inner = get(potential);
          if (isPlainObject(inner)) {
            v = inner as any;
          }
        }
        model.patchedValue = v;
        parent.registerChild(field, model as BasicModel<unknown>);
      } else {
        model = m;
      }
    } else if (isModelRef<$FieldSetValue<T>, any, FieldSetModel<T>>(field)) {
      const m = field.getModel();
      if (!m || !isFieldSetModel<T>(m)) {
        model = new FieldSetModel({} as T);
        model.patchedValue = or(field.patchedValue, () =>
          or(field.initialValue, () => ({}))
        );
        field.setModel(model);
      } else {
        model = m;
      }
    } else {
      model = field;
    }
    return model;
  }, [field, parent, strategy]);

  return model;
}

/**
 * 创建一个 `FieldSet`
 *
 * @param field model 或者字段名，当`FormStrategy`是`View`的时候才能用字段名
 * @param validators 当`field`是字段名的时候，可以传入`validator`
 */
export function useFieldSet<T extends UnknownFieldSetModelChildren>(
  field:
    | string
    | FieldSetModel<T>
    | ModelRef<$FieldSetValue<T>, any, FieldSetModel<T>>,
  validators: IValidators<$FieldSetValue<T>> = []
): IUseFieldSet<T> {
  const { parent, strategy, form } = useFormContext();
  const model = useFieldSetModel(field, parent, strategy);
  if (typeof field === 'string' || isModelRef(field)) {
    model.validators = validators;
  }
  const childContext = useMemo(
    () => ({
      strategy,
      form,
      parent: (model as unknown) as FieldSetModel,
    }),
    [strategy, form, model]
  );
  /**
   * ignore returned value
   * user can get the value from model
   */
  useValue$(model.error$, model.error$.getValue());
  useDestroyOnUnmount(field, model, parent);
  return [childContext, model];
}

/**
 * 订阅名为 `name` 的子 model 变更。
 * 变更包括增加/删除该子 model，但不包括子 model 内部数据的变化。
 * @param fieldSet 订阅 child 的 `FieldSetModel`
 * @param name child 的名字
 */
export function useNamedChildModel<
  T extends UnknownFieldSetModelChildren,
  K extends keyof T = keyof T
>(fieldSet: FieldSetModel<T>, name: K) {
  const [child, setChild] = useState(fieldSet.get(name));

  useEffect(() => {
    // FIXME: reuse after #1707 merges
    const $ = merge(fieldSet.childRegister$, fieldSet.childRemove$)
      .pipe(
        observeOn(asapScheduler),
        filter(k => k === name)
      )
      .subscribe(n => {
        setChild(fieldSet.get(n as K));
      });
    return () => $.unsubscribe();
  }, [fieldSet, name]);

  return child;
}
