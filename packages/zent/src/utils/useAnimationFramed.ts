import { useRef, useMemo, useCallback } from 'react';

export function useAnimationFramed(callback: () => void, deps: any[]) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const handleRef = useRef<number | null>(null);
  useMemo(() => {
    if (handleRef.current) {
      cancelAnimationFrame(handleRef.current);
      handleRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return useCallback(() => {
    if (!handleRef.current) {
      handleRef.current = requestAnimationFrame(() => {
        handleRef.current = null;
        callbackRef.current();
      });
    }
  }, []);
}

export default useAnimationFramed;
