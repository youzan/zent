/**
 * Tests whether MaybeDerive is a covariant of Base
 * @param {Function} MaybeDerive Class to test
 * @param {Function} Base Base class to test against
 */
export default function kindOf(MaybeDerive: Function | string, Base: Function) {
  return (
    MaybeDerive === Base ||
    (MaybeDerive && (MaybeDerive as any).prototype instanceof Base)
  );
}
