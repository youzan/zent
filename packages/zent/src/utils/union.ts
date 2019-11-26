export default function union<T>(
  ...arrays: Array<ArrayLike<T> | null | undefined>
): T[] {
  const exists = new Set<T>();
  const ret: T[] = [];

  for (let i = 0; i < arrays.length; i++) {
    const arr = arrays[i];
    if (arr === null || arr === undefined) {
      continue;
    }

    for (let j = 0; j < arr.length; j++) {
      const elem = arr[j];
      if (!exists.has(elem)) {
        ret.push(elem);
        exists.add(elem);
      }
    }
  }

  return ret;
}
