import { useEffect, useRef } from 'react';

export interface IWindowEventHandlerProps<K extends keyof WindowEventMap> {
  eventName: K;
  callback(ev: WindowEventMap[K]): void;
  useCapture?: boolean;
}

export function useWindowEvent<K extends keyof WindowEventMap>(
  eventName: K,
  callback: (ev: WindowEventMap[K]) => void,
  useCapture?: boolean
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => {
    function cb(e: WindowEventMap[K]) {
      callbackRef.current(e);
    }
    window.addEventListener(eventName, cb, !!useCapture);
    return () => window.removeEventListener(eventName, cb, !!useCapture);
  }, [!!useCapture, eventName]);
}

export function WindowEventHandler<K extends keyof WindowEventMap>({
  useCapture,
  eventName,
  callback,
}: IWindowEventHandlerProps<K>) {
  useWindowEvent(eventName, callback, useCapture);
  return null;
}

export default WindowEventHandler;
