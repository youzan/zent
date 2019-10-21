import { useRef, useMemo } from 'react';

export function useLazy<T>(init: () => T, deps: any[]): () => T | null {
  const valueRef = useRef<T | null>(null);
  return useMemo(() => {
    valueRef.current = null;
    return () => {
      if (!valueRef.current) {
        valueRef.current = init();
      }
      return valueRef.current;
    };
  }, deps);
}

export default useLazy;
