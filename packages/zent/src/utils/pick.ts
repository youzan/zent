// 支持一维对象字段提取
export default function pick<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  keys: ReadonlyArray<K>
): Pick<T, K> {
  if (obj === null || obj === undefined) {
    return {} as Pick<T, K>;
  }

  return keys.reduce<Pick<T, K>>((acc, k: any) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {} as Pick<T, K>);
}
