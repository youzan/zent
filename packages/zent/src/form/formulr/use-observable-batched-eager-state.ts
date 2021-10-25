import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  useObservable,
  useObservableEagerState,
  useRefFn,
} from 'observable-hooks';
import { filter, mergeMap, map } from 'rxjs/operators';
import { useCallback } from 'react';
import isPromise from '../../utils/isPromise';
import uniqueId from '../../utils/uniqueId';

/**
 * 类似 observable-hooks 里的 `useObservableEagerState`。
 *
 * `input$` 在 `runInBatchContext` 执行过程中产生的新值，除最后一个外都会被忽略；
 * 在 `runInBatchContext` 之外的更新操作不受影响。
 *
 * `runInBatchContext` 中的操作支持异步操作，此时应返回一个 `Promise`。
 *
 * 使用场景示例：
 *
 * 批量更新 `FieldArrayModel` 中每一项的值，但又不希望监听 `FieldArrayModel.value$` 的回调频繁触发，导致页面不停的被重绘。
 * @param input$ 通常是 `model.value$`
 */
export function useObservableBatchedEagerState<T>(
  input$: Observable<T>
): [
  value: T,
  runInBatchContext: (fn: (() => void) | (() => Promise<unknown>)) => void
] {
  const pendingTasksRef = useRefFn(() => new Set<string>());
  const taskStatusChanges$Ref = useRefFn(() => new BehaviorSubject(''));

  const runInBatchContext = useCallback(
    (fn: () => void) => {
      const taskId = uniqueId('batched-task-');
      const tasks = pendingTasksRef.current;
      const removeTask = () => {
        tasks.delete(taskId);
        taskStatusChanges$Ref.current.next(taskId);
      };

      // add to task queue
      tasks.add(taskId);
      taskStatusChanges$Ref.current.next(taskId);

      const ret = fn();

      // remove from task queue
      if (isPromise(ret)) {
        (ret as unknown as Promise<unknown>).then(removeTask, removeTask);
      } else {
        removeTask();
      }
    },
    [pendingTasksRef, taskStatusChanges$Ref]
  );

  const observable$ = useObservable(
    args$ => {
      return args$.pipe(
        mergeMap(sources$ => {
          return combineLatest(sources$).pipe(
            filter(([_, taskId]) => !pendingTasksRef.current.has(taskId)),
            map(([v]) => v)
          );
        })
      );
    },
    [input$, taskStatusChanges$Ref.current]
  );

  const value = useObservableEagerState(observable$);

  return [value, runInBatchContext];
}
