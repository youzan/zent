import { ListIterator } from './types';
import isNil from './isNil';

export default function findIndex<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: ListIterator<T, boolean>,
  fromIndex?: number
): number {
  if (isNil(array)) {
    return -1;
  }

  if (fromIndex === undefined || fromIndex < 0) {
    fromIndex = 0;
  } else if (fromIndex > array.length - 1) {
    fromIndex = array.length - 1;
  }

  for (let i = fromIndex; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }

  return -1;
}
