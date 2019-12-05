import { ICancelable } from './types';

export interface IDebounceOptions {
  /**
   * If immediate is `true`, trigger the function on the leading edge, instead of the trailing.
   */
  immediate?: boolean;
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for `wait` milliseconds
 */
export default function debounce<T extends (...args: any) => any>(
  func: T,
  wait = 0,
  options: IDebounceOptions = {}
): T & ICancelable {
  let timeout: ReturnType<typeof setTimeout> | undefined | null;
  let result: any;

  const later = (args?: any[]) => {
    timeout = null;
    if (args !== undefined) {
      result = func(...args);
    }
  };

  const debounced = (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (options.immediate) {
      const callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) {
        result = func(...args);
      }
    } else {
      timeout = setTimeout(() => {
        later(args);
      }, wait);
    }

    return result;
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced as T & ICancelable;
}
