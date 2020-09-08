import * as React from 'react';
import { merge, of, Observable, NEVER } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { useFormContext, FormContext, IFormContext } from './context';
import { useValue$ } from './hooks';
import {
  FieldModel,
  FieldArrayModel,
  isFieldSetModel,
  isFieldModel,
  isFieldArrayModel,
  isModelRef,
  ModelRef,
  IModel,
} from './models';
import { noop, $MergeProps } from './utils';

export interface IFieldSetValueProps {
  name: string;
  children?: React.ReactNode;
}

function useModelFromContext<Model>(
  ctx: IFormContext,
  name: string | undefined,
  model: Model | undefined,
  check: (m: any) => m is Model
): Model | null {
  const { parent } = ctx;
  const m = React.useMemo(() => {
    if (typeof name === 'string') {
      const m = parent.get(name);
      if (check(m)) {
        return m;
      }
    }
    if (check(model)) {
      return model;
    }
    return null;
  }, [name, model, check, parent]);
  const [maybeModel, setModel] = React.useState(m);
  React.useEffect(() => {
    if (!name) {
      return noop;
    }
    const m = parent.get(name);
    check(m) && setModel(m);
    const $ = merge(parent.childRegister$, parent.childRemove$)
      .pipe(filter(change => change === name))
      .subscribe(name => {
        const candidate = parent.get(name);
        if (check(candidate)) {
          setModel(candidate);
        }
      });
    return () => $.unsubscribe();
  }, [name, parent, m, check]);
  return maybeModel;
}

/**
 * 根据 `name` 订阅 `FieldSet` 的值
 */
export function FieldSetValue({ name, children }: IFieldSetValueProps) {
  const ctx = useFormContext();
  const model = useModelFromContext(ctx, name, undefined, isFieldSetModel);
  const childContext = React.useMemo<IFormContext>(
    () => ({
      ...ctx,
      parent: model!,
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
  model: FieldModel<T>;
}

export type IFieldValueProps<T> =
  | IFieldValueModelDrivenProps<T>
  | IFieldValueViewDrivenProps<T>;

export function useFieldValue<T>(field: string | FieldModel<T>): T | null {
  const ctx = useFormContext();
  const [model, setModel] = React.useState<
    FieldModel<T> | ModelRef<T, any, FieldModel<T>> | null
  >(
    isFieldModel<T>(field) || isModelRef<T, any, FieldModel<T>>(field)
      ? field
      : null
  );
  React.useEffect(() => {
    if (typeof field !== 'string') {
      setModel(isFieldModel(field) || isModelRef(field) ? field : null);
      return noop;
    }
    const m = ctx.parent.get(field);
    if (isFieldModel<T>(m)) {
      setModel(m);
    }
    const $ = merge(ctx.parent.childRegister$, ctx.parent.childRemove$)
      .pipe(filter(change => change === field))
      .subscribe(name => {
        const candidate = ctx.parent.get(name);
        if (isFieldModel<T>(candidate)) {
          setModel(candidate);
        }
      });
    return () => $.unsubscribe();
  }, [field, ctx.parent]);

  const [value, setValue] = React.useState<T | null>(() =>
    model && !isModelRef(model) ? model.value : null
  );

  React.useEffect(() => {
    if (isModelRef(model)) {
      const $ = model.model$
        .pipe(
          switchMap<FieldModel<T> | null, Observable<T | null>>(it => {
            if (isFieldModel(it)) {
              return it.value$;
            }
            return of(null);
          })
        )
        .subscribe(setValue);

      return () => $.unsubscribe();
    } else if (model) {
      const $ = model.value$.subscribe(setValue);

      return () => $.unsubscribe;
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

/**
 * 根据 `name` 或者 `model` 订阅 `FieldArray` 的更新
 */
export function useFieldArrayValue<Item, Child extends IModel<Item>>(
  field: string | FieldArrayModel<Item, Child>
): Child[] | null {
  const ctx = useFormContext();
  const model = useModelFromContext(
    ctx,
    field as string | undefined,
    field as FieldArrayModel<Item, Child> | undefined,
    isFieldArrayModel
  );
  const maybeChildren = useValue$(model?.children$ ?? NEVER, model?.children);

  return maybeChildren as Child[] | null;
}
