import { ICancelable } from './types';

export function runInNextFrame(callback: () => void): () => void {
  let rafId = requestAnimationFrame(() => {
    rafId = requestAnimationFrame(() => {
      callback();
      rafId = null;
    });
  });

  return () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

/**
 * Invoke `callback` only once in next frame with arguments from the last invocation.
 */
export function runOnceInNextFrame<T extends (...args: unknown[]) => void>(
  callback: T
): T & ICancelable {
  let ticking = false;
  let savedArgs: unknown[];
  let cancel: () => void = null;

  const fn = (...args: unknown[]) => {
    savedArgs = args;
    if (!ticking) {
      cancel = runInNextFrame(() => {
        callback(...savedArgs);
        cancel = null;
        ticking = false;
      });
      ticking = true;
    }
  };
  fn.cancel = () => {
    cancel?.();
  };

  return fn as T & ICancelable;
}
