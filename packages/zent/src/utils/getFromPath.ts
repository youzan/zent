const has = Object.prototype.hasOwnProperty;

/**
 * Like _.get, but only supports objects!
 * You don't need this function 99% of the time.
 */
export default function getFromPath(
  obj: Record<string | number, any>,
  path?: string | string[],
  defaultValue?: unknown
): unknown {
  if (typeof path === 'string') {
    path = path.split('.');
  }

  path = path ?? [];
  let val = obj;
  for (let i = 0; i < path.length; i++) {
    const k = path[i];
    if (!has.call(val, k)) {
      return defaultValue;
    }
    val = val[k];
  }

  return path.length ? val : defaultValue;
}
