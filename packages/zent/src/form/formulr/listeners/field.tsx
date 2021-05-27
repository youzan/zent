import { useEffect, useState } from 'react';
import { asapScheduler, Observable, of, BehaviorSubject } from 'rxjs';
import { observeOn, switchMap } from 'rxjs/operators';
import noop from '../../../utils/noop';
import { useFormContext } from '../context';
import { BasicModel, IModel, isModel, isModelRef } from '../models';
import { $MergeProps } from '../utils';
import { getFieldSetChildChangeObservable } from './utils';

export interface IFieldListenerCommonProps<T> {
  /**
   * render props，参数是 Field 当前的值
   */
  children?: (value: T | null) => React.ReactElement | null;
}

export interface IFieldValueViewDrivenProps<T>
  extends IFieldListenerCommonProps<T> {
  name: string;
}

export interface IFieldValueModelDrivenProps<T>
  extends IFieldListenerCommonProps<T> {
  model: BasicModel<T>;
}

export type IFieldValueProps<T> =
  | IFieldValueModelDrivenProps<T>
  | IFieldValueViewDrivenProps<T>;

export interface IFieldValidViewDrivenProps
  extends IFieldListenerCommonProps<boolean> {
  name: string;
}

export interface IFieldValidModelDrivenProps<T>
  extends IFieldListenerCommonProps<boolean> {
  model: BasicModel<T>;
}

export type IFieldValidProps<T> =
  | IFieldValidModelDrivenProps<T>
  | IFieldValidViewDrivenProps;

/**
 * Subscribe the value state of a model
 * @deprecated Use `useFieldValue`
 * @param model
 */
export function useModelValue<T>(model: IModel<T>): T | null {
  return useModelObservable(model, getValueObservable);
}

/**
 * Subscribe the valid state of a model
 * @deprecated Use `useFieldValid`
 * @param model
 */
export function useModelValid<T>(model: IModel<T>): boolean | null {
  return useModelObservable(model, getValidObservable);
}

/**
 * Subscribe the value state of a model.
 * Note that it works in FormContext only.
 * @param field
 */
export function useFieldValue<T>(field: string | IModel<T>): T | null {
  return useFieldObservable(field, getValueObservable);
}

/**
 * 根据 `name` 或者 `model` 订阅字段值的更新
 */
export function FieldValue<T>(
  props: IFieldValueProps<T>
): React.ReactElement | null {
  const { name, model, children } = props as $MergeProps<IFieldValueProps<T>>;
  const value = useFieldValue(model || name);
  if (children) {
    return children(value);
  }
  return (value as unknown) as React.ReactElement;
}

/**
 * Subscribe the valid state of a model.
 * Note that it works in FormContext only.
 * @param field
 */
export function useFieldValid<T>(field: string | IModel<T>): boolean | null {
  return useFieldObservable(field, getValidObservable);
}

/**
 * 根据 `name` 或者 `model` 订阅字段校验状态的更新
 */
export function FieldValid<T>(
  props: IFieldValidProps<T>
): React.ReactElement | null {
  const { name, model, children } = props as $MergeProps<IFieldValidProps<T>>;
  const value = useFieldValid(model || name);
  if (children) {
    return children(value);
  }
  return (value as unknown) as React.ReactElement;
}

function getValueObservable<T>(model: BasicModel<T>) {
  return model.value$;
}

function getValidObservable<T>(model: BasicModel<T>) {
  return model.valid$;
}

function useFieldObservable<T, V>(
  field: IModel<T> | string,
  observable: (model: BasicModel<T>) => BehaviorSubject<V>
) {
  const ctx = useFormContext(typeof field !== 'string');
  const [model, setModel] = useState<IModel<T> | null>(() => {
    if (typeof field === 'string') {
      const m = ctx.parent.get(field);
      return isModel<T>(m) ? m : null;
    } else if (
      isModel<T>(field) ||
      isModelRef<T, IModel<unknown>, BasicModel<T>>(field)
    ) {
      return field;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (typeof field !== 'string') {
      setModel(
        isModel<T>(field) ||
          isModelRef<T, IModel<unknown>, BasicModel<T>>(field)
          ? field
          : null
      );
      return noop;
    }

    const m = ctx.parent.get(field);
    if (isModel<T>(m)) {
      setModel(m);
    }

    const $ = getFieldSetChildChangeObservable(ctx.parent, field).subscribe(
      name => {
        const candidate = ctx.parent.get(name);
        if (isModel<T>(candidate)) {
          setModel(candidate);
        }
      }
    );
    return () => $.unsubscribe();
  }, [field, ctx, ctx?.parent]);

  return useModelObservable(model, observable);
}

function useModelObservable<T, V>(
  model: IModel<T> | null,
  observable: (model: BasicModel<T>) => BehaviorSubject<V>
) {
  const [value, setValue] = useState<V | null>(() => {
    if (isModel<T>(model)) {
      return observable(model).value;
    } else if (isModelRef<T, IModel<any>, BasicModel<T>>(model)) {
      const inner = model.getModel();
      return inner ? observable(inner).value : null;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (isModelRef<T, IModel<any>, BasicModel<T>>(model)) {
      const $ = model.model$
        .pipe(
          observeOn(asapScheduler),
          switchMap<BasicModel<T> | null, Observable<V | null>>(it => {
            if (isModel<T>(it)) {
              return observable(it);
            }
            return of(null);
          })
        )
        .subscribe(setValue);

      return () => $.unsubscribe();
    } else if (isModel<T>(model)) {
      const $ = observable(model).subscribe(setValue);

      return () => $.unsubscribe();
    } else {
      return noop;
    }
  }, [model, observable]);

  return value;
}
