import { ICancelable } from './types';
import { useMemo } from 'react';

/**
 * https://medium.com/@paul_irish/requestanimationframe-scheduling-for-nerds-9c57f7438ef4
 *
 * All rAF callbacks always run in the same or next frame of work.
 * Any rAFs queued in your event handlers will be executed in the same frame.
 * Any rAFs queued in a rAF will be executed in the next frame.
 * (Same for any queued within IntersectionObserver or ResizeObserver callbacks.)
 */
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

export const useRunOnceInNextFrame = <T extends (...args: unknown[]) => void>(
  cb: T,
  disabled: boolean
): T & Partial<ICancelable> => {
  return useMemo(
    () => (!disabled ? runOnceInNextFrame(cb) : cb),
    [cb, disabled]
  );
};
