import { useCallback, useRef, useEffect } from 'react';

export function useAsyncSafeDispatch<Args extends unknown[], R>(
  dispatch: (...args: Args) => R
) {
  const mounted = useMounted();
  return useCallback(
    (...args: Args) => {
      mounted.current && dispatch(...args);
    },
    [dispatch, mounted]
  );
}

function useMounted() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  });
  return ref;
}
