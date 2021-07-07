import {
  CompositionEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  CallbackNode,
  unstable_IdlePriority as IdlePriority,
  unstable_scheduleCallback as scheduleCallback,
} from 'scheduler';
import { FieldModel } from './models/field';
import { ValidateOption } from './validate';
import { id, last } from './utils';

export function multi<T, R>(...funcs: ((t: T) => R)[]): (t: T) => void {
  return (t: T) => {
    funcs.forEach(func => func(t));
  };
}

export function useMulti<T, R>(
  func1: (t: T) => R,
  func2: (t: T) => R,
  deps?: any[]
): (t: T) => void;
export function useMulti<T, R>(
  func1: (t: T) => R,
  func2: (t: T) => R,
  func3: (t: T) => R,
  deps?: any[]
): (t: T) => void;
export function useMulti<T, R>(
  func1: (t: T) => R,
  func2: (t: T) => R,
  func3: (t: T) => R,
  func4: (t: T) => R,
  deps?: any[]
): (t: T) => void;
export function useMulti<T, R>(
  func1: (t: T) => R,
  func2: (t: T) => R,
  func3: (t: T) => R,
  func4: (t: T) => R,
  func5: (t: T) => R,
  deps?: any[]
): (t: T) => void;
export function useMulti<T, R>(
  func1: (t: T) => R,
  func2: (t: T) => R,
  func3: (t: T) => R,
  func4: (t: T) => R,
  func5: (t: T) => R,
  func6: (t: T) => R,
  deps?: any[]
): (t: T) => void;
export function useMulti<T, R>(
  func1: (t: T) => R,
  func2: (t: T) => R,
  func3: (t: T) => R,
  func4: (t: T) => R,
  func5: (t: T) => R,
  func6: (t: T) => R,
  func7: (t: T) => R,
  deps?: any[]
): (t: T) => void;
export function useMulti<T, R>(
  func1: (t: T) => R,
  func2: (t: T) => R,
  func3: (t: T) => R,
  func4: (t: T) => R,
  func5: (t: T) => R,
  func6: (t: T) => R,
  func7: (t: T) => R,
  func8: (t: T) => R,
  deps?: any[]
): (t: T) => void;
export function useMulti<T>(...funcs: any[]): (t: T) => void {
  let deps: any[];
  if (Array.isArray(last(funcs))) {
    deps = funcs.pop()!;
  } else {
    deps = funcs;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(multi(...funcs), deps);
}

export type Func<Args extends any[], R> = (...args: Args) => R;
export type Middleware<F> = (next: F) => F;

/**
 * ## example middleware
 * ```tsx
 * function when<Value>(condition: () => boolean | Promise<boolean>): Middleware<IValidator<Value>> {
 *   return (next: IValidator<Value>) =>
 *     createAsyncValidator((value, ctx) => {
 *       return of(condition()).pipe(
 *         switchMap(cond => {
 *           if (cond) {
 *             return isAsyncValidator(next) ? next.validator(value, ctx) ?? of(null) : of(next(value, ctx));
 *            }
 *           return of(null);
 *        }),
 *      );
 *    });
 *   }
 * }
 *
 * const validator = compose(when(() => Math.random() > 0.5))(required('required if random number great then 5'));
 *
 * <Field validators={[validator]}></Field>
 * ```
 */
export function compose<Target>(...middlewares: Middleware<Target>[]) {
  return (target: Target) =>
    middlewares.reduceRight(
      (currentTarget, middleware) => middleware(currentTarget),
      target
    );
}

/**
 * @deprecated use `useMulti` instead
 *
 * `const callback = useMAppend(foo, bar, baz)`
 *
 * is equal to
 * ```js
 * const callback = useCallback(arg => {
 *   foo(arg);
 *   bar(arg);
 *   baz(arg);
 * }, [foo, bar, baz])
 * ```
 */
export function useMAppend<T>(...fns: ((t: T) => void)[]): (t: T) => void {
  return useCallback((value: T) => {
    for (let i = 0; i < fns.length; i += 1) {
      const f = fns[i];
      f(value);
    }
  }, fns); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * `const callback = usePipe(foo, bar, baz)`
 *
 * is equal to
 * ```js
 * const callback = useMemo(() => arg => {
 *  return baz(bar(foo(arg)))
 * }, [foo, bar, baz])
 * ```
 */
export function usePipe<T0, T1, T2>(
  fn0: (t0: T0) => T1,
  fn1: (t1: T1) => T2,
  deps?: any[]
): (t0: T0) => T2;
export function usePipe<T0, T1, T2, T3>(
  fn0: (t0: T0) => T1,
  fn1: (t1: T1) => T2,
  fn2: (t2: T2) => T3,
  deps?: any[]
): (t0: T0) => T3;
export function usePipe<T0, T1, T2, T3, T4>(
  fn0: (t0: T0) => T1,
  fn1: (t1: T1) => T2,
  fn2: (t2: T2) => T3,
  fn3: (t3: T3) => T4,
  deps?: any[]
): (t0: T0) => T4;
export function usePipe<T0, T1, T2, T3, T4, T5>(
  fn0: (t0: T0) => T1,
  fn1: (t1: T1) => T2,
  fn2: (t2: T2) => T3,
  fn3: (t3: T3) => T4,
  fn4: (t4: T4) => T5,
  deps?: any[]
): (t0: T0) => T5;
export function usePipe<T0, T1, T2, T3, T4, T5, T6>(
  fn0: (t0: T0) => T1,
  fn1: (t1: T1) => T2,
  fn2: (t2: T2) => T3,
  fn3: (t3: T3) => T4,
  fn4: (t4: T4) => T5,
  fn5: (t5: T5) => T6,
  deps?: any[]
): (t0: T0) => T6;
export function usePipe<T0, T1, T2, T3, T4, T5, T6, T7>(
  fn0: (t0: T0) => T1,
  fn1: (t1: T1) => T2,
  fn2: (t2: T2) => T3,
  fn3: (t3: T3) => T4,
  fn4: (t4: T4) => T5,
  fn5: (t5: T5) => T6,
  fn6: (t6: T6) => T7,
  deps?: any[]
): (t0: T0) => T7;
export function usePipe<T0, T1, T2, T3, T4, T5, T6, T7, T8>(
  fn0: (t0: T0) => T1,
  fn1: (t1: T1) => T2,
  fn2: (t2: T2) => T3,
  fn3: (t3: T3) => T4,
  fn4: (t4: T4) => T5,
  fn5: (t5: T5) => T6,
  fn6: (t6: T6) => T7,
  fn7: (t7: T7) => T8,
  deps?: any[]
): (t0: T0) => T8;

export function usePipe<T, R>(...args: any[]): (v: T) => R {
  const l = last(args);
  let deps: any[];
  if (Array.isArray(l)) {
    args.pop();
    deps = l;
  } else {
    deps = args;
  }
  return useMemo(() => {
    const fn = args.reduceRight((next, f) => (arg: any) => next(f(arg)), id);
    return (t: T): R => fn(t);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * 生成一个默认的`onChange`回调，这个回调会触发`model.validate`
 * 如果不需要在onChange的时候触发校验，如下即可：
 * ```js
 * const onChange = useCallback(value => model.value = value, [model]);
 * ```
 * 例如是一个`input`：
 * ```ts
 * const onChange = useCallback((value: React.ChangeEvent<HTMLInputElement>) => {
 *   model.value = e.target.value;
 * }, [model]);
 * ```
 * 可以配合usePipe使用：
 * ```js
 * function mapEventToValue(e) {
 *   return e.target.value;
 * }
 * function Foo() {
 *   const onChange = FieldUtils.usePipe(
 *     mapEventToValue,
 *     FieldUtils.makeChangeHandler(model),
 *   );
 * }
 * ```
 */
export function makeChangeHandler<Value>(
  model: FieldModel<Value>,
  option = ValidateOption.Default | ValidateOption.ExcludePristine,
  callback?: (value: Value) => void
) {
  /* eslint-disable-next-line  react-hooks/rules-of-hooks */
  const taskRef = useRef<CallbackNode | null>(null);
  /* eslint-disable-next-line  react-hooks/rules-of-hooks */
  const ref = useRef({
    option,
    callback,
  });
  /* eslint-disable-next-line  react-hooks/rules-of-hooks */
  useEffect(() => {
    ref.current = {
      option,
      callback,
    };
  }, [option, callback]);
  /* eslint-disable-next-line  react-hooks/rules-of-hooks */
  return useCallback(
    (value: Value) => {
      model.value = value;
      ref.current.callback?.(value);
      if (model.isCompositing) {
        return;
      }
      if (!taskRef.current) {
        taskRef.current = scheduleCallback(IdlePriority, () => {
          taskRef.current = null;
          model.validate(ref.current.option);
        });
      }
    },
    [model]
  );
}

export interface ICompositionHandlers<E = Element> {
  onCompositionStart: CompositionEventHandler<E>;
  onCompositionEnd: CompositionEventHandler<E>;
}

/**
 * 生成一组 `onCompositionStart` 和 `onCompositionEnd` 的回调函数，用于跟踪输入法 composition 的状态，
 * 这个状态会写到 `model.isCompositing` 字段上。
 * @param model 用于记录状态的 `model` 对象
 * @param callbacks 上层传入的被代理的回调
 */
export function useCompositionHandler<Value, E = Element>(
  model: FieldModel<Value>,
  callbacks?: Partial<ICompositionHandlers<E>>
): ICompositionHandlers<E> {
  const ref = useRef(callbacks);
  useEffect(() => {
    ref.current = callbacks;
  });
  return useMemo(
    () => ({
      onCompositionStart(e) {
        model.isCompositing = true;
        ref.current?.onCompositionStart?.(e);
      },
      onCompositionEnd(e) {
        model.isCompositing = false;
        ref.current?.onCompositionEnd?.(e);
      },
    }),
    [model]
  );
}
