export default function pick<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  paths: ReadonlyArray<K>
): Pick<T, K> {
  if (obj === null || obj === undefined) {
    return {} as Pick<T, K>;
  }

  return Object.keys(obj).reduce<Pick<T, K>>((acc, k: any) => {
    if (paths.indexOf(k) !== -1) {
      acc[k] = obj[k];
    }

    return acc;
  }, {} as Pick<T, K>);
}
