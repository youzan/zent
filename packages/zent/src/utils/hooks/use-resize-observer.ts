import { useCallback, useEffect, useRef } from 'react';
import { runOnceInNextFrame } from '../nextFrame';

const ResizeObserver = window.ResizeObserver;

export const useResizeObserver = (callback: ResizeObserverCallback) => {
  const observerRef = useRef<ResizeObserver>(null);

  const getObserverInstance = useCallback(
    () => ResizeObserver && new ResizeObserver(runOnceInNextFrame(callback)),
    [callback]
  );

  useEffect(() => {
    observerRef.current = getObserverInstance();
  }, [getObserverInstance]);

  const observe = useCallback(
    (target: Element, options?: ResizeObserverOptions) => {
      if (target) {
        observerRef.current?.observe(target, options);
      }
    },
    [observerRef]
  );

  const unobserve = useCallback(
    (target: Element) => {
      observerRef.current?.unobserve(target);
    },
    [observerRef]
  );

  const disconnect = useCallback(() => {
    observerRef.current?.disconnect();
  }, [observerRef]);

  return {
    observer: observerRef,
    observe,
    unobserve,
    disconnect,
  };
};
