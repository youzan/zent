import { useCallback, useEffect, useRef } from 'react';
import { runOnceInNextFrame } from '../nextFrame';

const ResizeObserver = window.ResizeObserver;

interface IUseResizeObserverCallback {
  (entry: ResizeObserverEntry): void;
}

export const useSingleResizeObserver = (
  callback: IUseResizeObserverCallback
) => {
  const getObserverInstance = useCallback(
    () =>
      ResizeObserver &&
      new ResizeObserver(
        runOnceInNextFrame(entries => {
          callback(entries[0]);
        })
      ),
    [callback]
  );
  const observerInstanceRef = useRef<ResizeObserver>(getObserverInstance());

  useEffect(() => {
    observerInstanceRef.current = getObserverInstance();
  }, [getObserverInstance]);

  const observe = useCallback(
    (target: HTMLElement) => {
      if (target) {
        observerInstanceRef.current?.observe(target);
      }
    },
    [observerInstanceRef]
  );

  const unObserve = useCallback(() => {
    observerInstanceRef.current?.disconnect();
  }, [observerInstanceRef]);

  return {
    observerInstance: observerInstanceRef.current,
    observe,
    unObserve,
  };
};
