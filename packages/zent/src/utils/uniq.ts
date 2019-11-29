export default function uniq<T>(
  array: ArrayLike<T> | null | undefined,
  iteratee?: ((value: T) => unknown) | string | number | symbol
): T[] {
  const exists = new Set<unknown>();
  const ret: T[] = [];

  for (let i = 0; i < array.length; i++) {
    const rawValue = array[i];
    let val: unknown;
    if (typeof iteratee === 'function') {
      val = iteratee(rawValue);
    } else if (iteratee === undefined) {
      val = rawValue;
    } else {
      val = rawValue[iteratee];
    }

    if (!exists.has(val)) {
      ret.push(rawValue);
      exists.add(val);
    }
  }

  return ret;
}
