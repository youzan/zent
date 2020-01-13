import { useRef, MutableRefObject } from 'react';

export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T
): MutableRefObject<T> {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return callbackRef;
}
