import { useCallback, useRef } from 'react';
import { runOnceInNextFrame } from '../nextFrame';

const ResizeObserver = window.ResizeObserver;

interface IUseResizeObserverCallback {
  (entry: ResizeObserverEntry): void;
}

const useSingleResizeObserver = (callback: IUseResizeObserverCallback) => {
  const observerInstanceRef = useRef<ResizeObserver>(
    ResizeObserver &&
      new ResizeObserver(
        runOnceInNextFrame(entries => {
          callback(entries[0]);
        })
      )
  );

  const observerInstance = observerInstanceRef.current;

  const observe = useCallback(
    (target: HTMLElement) => {
      if (observerInstance && target) {
        observerInstance.observe(target);
      }
    },
    [observerInstance]
  );

  const unObserve = useCallback(() => {
    observerInstance?.disconnect();
  }, [observerInstance]);

  return {
    observerInstance,
    observe,
    unObserve,
  };
};

export default useSingleResizeObserver;
