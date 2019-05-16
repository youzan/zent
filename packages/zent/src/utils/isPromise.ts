/**
 * Test whether an object looks like a promise
 *
 * @export
 * @param {any} obj
 * @returns {bool}
 */
export default function isPromise<T = unknown>(obj: any): obj is Promise<T> {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}
