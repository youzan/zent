import { useRef, useEffect, MutableRefObject } from 'react';

export function useEventCallbackRef<T extends (...args: any[]) => any>(
  callback: T
): MutableRefObject<T> {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef;
}
