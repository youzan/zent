import * as React from 'react';
import { merge, asapScheduler, Observable, of } from 'rxjs';
import { observeOn, filter, switchMap } from 'rxjs/operators';
import noop from '../../../utils/noop';
import { useFormContext } from '../context';
import { BasicModel, IModel, isModel, isModelRef, ModelRef } from '../models';
import { $MergeProps } from '../utils';

export interface IFieldValueCommonProps<T> {
  /**
   * render props，参数是 Field 当前的值
   */
  children?: (value: T | null) => React.ReactElement | null;
}

export interface IFieldValueViewDrivenProps<T>
  extends IFieldValueCommonProps<T> {
  name: string;
}

export interface IFieldValueModelDrivenProps<T>
  extends IFieldValueCommonProps<T> {
  model: BasicModel<T>;
}

export type IFieldValueProps<T> =
  | IFieldValueModelDrivenProps<T>
  | IFieldValueViewDrivenProps<T>;

export function useFieldValue<T>(field: string | BasicModel<T>): T | null {
  const ctx = useFormContext();
  const [model, setModel] = React.useState<
    BasicModel<T> | ModelRef<T, IModel<any>, BasicModel<T>> | null
  >(
    isModel<T>(field) || isModelRef<T, any, BasicModel<T>>(field)
      ? field
      : () => {
          const m = ctx.parent.get(field);
          return isModel<T>(m) ? m : null;
        }
  );
  React.useEffect(() => {
    if (typeof field !== 'string') {
      setModel(isModel(field) || isModelRef(field) ? field : null);
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
  }, [field, ctx.parent]);

  const [value, setValue] = React.useState<T | null>(() =>
    model && !isModelRef<T, IModel<any>, BasicModel<T>>(model)
      ? model.value
      : null
  );

  React.useEffect(() => {
    if (isModelRef<T, IModel<any>, BasicModel<T>>(model)) {
      const $ = model.model$
        .pipe(
          observeOn(asapScheduler),
          switchMap<BasicModel<T> | null, Observable<T | null>>(it => {
            if (isModel<T>(it)) {
              return it.value$;
            }
            return of(null);
          })
        )
        .subscribe(setValue);

      return () => $.unsubscribe();
    } else if (model) {
      const $ = model.value$.subscribe(setValue);

      return () => $.unsubscribe();
    } else {
      return noop;
    }
  }, [model]);

  return value;
}

/**
 * 根据 `name` 或者 `model` 订阅字段的更新
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

// export function useFieldValid(nameOrModel: string | BasicModel<unknown>) {
//   let ctx: IFormContext | undefined;
//   if (typeof nameOrModel === 'string') {
//     /* eslint-disable-next-line react-hooks/rules-of-hooks */
//     ctx = useFormContext();
//   }
//   const value;
// }
