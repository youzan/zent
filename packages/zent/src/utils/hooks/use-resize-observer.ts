import { useCallback, useEffect, useRef } from 'react';
import { runOnceInNextFrame } from '../nextFrame';

const ResizeObserver = window.ResizeObserver;

const useResizeObserver = (callback: ResizeObserverCallback) => {
  const observerRef = useRef<ResizeObserver>(null);

  const getObserverInstance = useCallback(
    () => ResizeObserver && new ResizeObserver(runOnceInNextFrame(callback)),
    [callback]
  );

  useEffect(() => {
    observerRef.current = getObserverInstance();
  }, [getObserverInstance]);

  const observe = useCallback(
    (target: HTMLElement) => {
      if (target) {
        observerRef.current?.observe(target);
      }
    },
    [observerRef]
  );

  const unobserve = useCallback(
    (target: HTMLElement) => {
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

export default useResizeObserver;
