import { useEffect, useState } from 'react';
import { merge, asapScheduler, Observable, of, BehaviorSubject } from 'rxjs';
import { observeOn, filter, switchMap } from 'rxjs/operators';
import noop from '../../../utils/noop';
import { useFormContext } from '../context';
import { BasicModel, IModel, isModel, isModelRef, ModelRef } from '../models';
import { $MergeProps } from '../utils';

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
 * @param field
 */
export function useFieldValue<T>(field: string | IModel<T>) {
  return useFieldObservable<IModel<T>, T, T>(field, getValueObservable);
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
 * Subscribe the valid state of a model
 * @param field
 */
export function useFieldValid<T>(field: string | IModel<T>) {
  return useFieldObservable<IModel<T>, T, boolean>(field, getValidObservable);
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

function useFieldObservable<M extends IModel<T>, T, V>(
  field: M | string,
  observable: (model: BasicModel<T>) => BehaviorSubject<V>
) {
  const ctx = useFormContext();
  const [model, setModel] = useState<
    BasicModel<T> | ModelRef<T, IModel<unknown>, BasicModel<T>> | null
  >(
    isModel<T>(field) || isModelRef<T, IModel<unknown>, BasicModel<T>>(field)
      ? field
      : () => {
          const m = ctx.parent.get(field as string);
          return isModel<T>(m) ? m : null;
        }
  );
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

    /**
     * Because `FieldSetModel.prototype.registerChild` will be
     * called inside `useMemo`, consume at next micro task queue
     * to avoid react warning below.
     *
     * Cannot update a component from inside the function body
     * of a different component.
     */
    const $ = merge(ctx.parent.childRegister$, ctx.parent.childRemove$)
      .pipe(
        observeOn(asapScheduler),
        filter(change => change === field)
      )
      .subscribe(name => {
        const candidate = ctx.parent.get(name);
        if (isModel<T>(candidate)) {
          setModel(candidate);
        }
      });
    return () => $.unsubscribe();
  }, [field, ctx, ctx.parent]);

  const [value, setValue] = useState<V | null>(() =>
    model && !isModelRef<T, IModel<unknown>, BasicModel<T>>(model)
      ? observable(model).value
      : null
  );

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
