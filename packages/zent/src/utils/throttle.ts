import { ICancelable } from './types';

export interface IThrottleOptions {
  immediate?: boolean;
}

type TimerId = ReturnType<typeof setTimeout> | undefined | null;

export default function throttle<T extends (...args: any) => any>(
  func: T,
  wait?: number,
  options: IThrottleOptions = {}
): T & ICancelable {
  let timerId: TimerId;
  let result: any;
  let args: any[];
  let previous = 0;
  const { immediate = false } = options;

  const later = () => {
    previous = immediate === false ? 0 : Date.now();
    timerId = null;
    result = func(...args);
    if (!timerId) {
      args = null;
    }
  };

  const throttled = (...params: any[]) => {
    const now = Date.now();
    if (!previous && immediate === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);
    args = params;
    if (remaining <= 0 || remaining > wait) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }

      previous = now;
      result = func(...args);
      if (!timerId) {
        args = null;
      }
    } else if (!timerId && immediate === false) {
      timerId = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = () => {
    clearTimeout(timerId);
    previous = 0;
    timerId = args = null;
  };

  return throttled as T & ICancelable;
}
