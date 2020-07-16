import { useCallback } from 'react';
import { useMounted } from './useMounted';

/**
 * 这个hook对React返回的状态更新函数（例
 * 如useState、useReducer的返回值）包装
 * 了一层，避免在异步回调中使用时导致可能的
 * 内存泄漏（Async-Safe）
 * @param dispatch
 */
export function useAsyncSafeDispatch<Args extends unknown[]>(
  dispatch: (...args: Args) => void
) {
  const mounted = useMounted();
  return useCallback(
    (...args: Args) => {
      mounted.current && dispatch(...args);
    },
    [dispatch, mounted]
  );
}
