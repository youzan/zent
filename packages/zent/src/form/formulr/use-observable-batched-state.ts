import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  useObservable,
  useObservableEagerState,
  useRefFn,
} from 'observable-hooks';
import { filter, mergeMap, map } from 'rxjs/operators';
import { useCallback } from 'react';

/**
 * 类似 observable-hooks 里的 `useObservableEagerState`。
 *
 * `input$` 在 `runInBatchContext` 执行过程中产生的新值，除最后一个外都会被忽略；
 * 在 `runInBatchContext` 之外的更新操作不受影响。
 *
 * 使用场景示例：
 *
 * 批量更新 `FieldArrayModel` 中每一项的值，但又不希望监听 `FieldArrayModel.value$` 的回调频繁触发，导致页面不停的被重绘。
 * @param input$ 通常是 `model.value$`
 */
export function useObservableBatchedEagerState<T>(
  input$: Observable<T>
): [value: T, runInBatchContext: (fn: () => void) => void] {
  const batching$Ref = useRefFn(() => new BehaviorSubject(false));

  const runInBatchContext = useCallback(
    (fn: () => void) => {
      batching$Ref.current.next(true);
      fn();
      batching$Ref.current.next(false);
    },
    [batching$Ref]
  );

  const observable$ = useObservable(
    args$ => {
      return args$.pipe(
        mergeMap(sources$ => {
          return combineLatest(sources$).pipe(
            filter(([_, batching]) => !batching),
            map(([v]) => v)
          );
        })
      );
    },
    [input$, batching$Ref.current]
  );

  const value = useObservableEagerState(observable$);

  return [value, runInBatchContext];
}
