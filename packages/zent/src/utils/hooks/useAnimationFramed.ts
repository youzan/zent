import { useRef, useCallback, useEffect } from 'react';

export function useAnimationFramed(callback: () => void) {
  const callbackRef = useRef(callback);
  const handleRef = useRef<number | null>(null);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  return useCallback(() => {
    if (!handleRef.current) {
      handleRef.current = requestAnimationFrame(() => {
        handleRef.current = null;
        callbackRef.current();
      });
    }
  }, []);
}
