// 支持一维对象字段提取
import { hasOwnProperty } from './hasOwn';

export default function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T | null | undefined,
  keys: ReadonlyArray<K>
): Pick<T, K> {
  if (obj === null || obj === undefined) {
    return {} as Pick<T, K>;
  }

  return keys.reduce<Pick<T, K>>((acc, k: any) => {
    if (hasOwnProperty(obj, k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {} as Pick<T, K>);
}
