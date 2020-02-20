import { ListIterator } from './types';
import isNil from './isNil';

export default function findLastIndex<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: ListIterator<T, boolean>,
  fromIndex?: number
): number {
  if (isNil(array)) {
    return -1;
  }

  if (fromIndex === undefined || fromIndex > array.length - 1) {
    fromIndex = array.length - 1;
  } else if (fromIndex < 0) {
    fromIndex = 0;
  }

  for (let i = fromIndex; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }

  return -1;
}
