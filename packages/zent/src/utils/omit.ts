export default function omit<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  paths: ReadonlyArray<K>
): Omit<T, K> {
  if (obj === null || obj === undefined) {
    return {} as Omit<T, K>;
  }

  return Object.keys(obj).reduce<Omit<T, K>>((acc, k: any) => {
    if (paths.indexOf(k) === -1) {
      acc[k] = obj[k];
    }

    return acc;
  }, {} as Omit<T, K>);
}
