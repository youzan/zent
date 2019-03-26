/**
 * Test whether an object looks like a promise
 *
 * @export
 * @param {any} obj
 * @returns {bool}
 */
export default function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}
