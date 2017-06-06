/**
 * Tests whether MaybeDerive is a covariant of Base
 * @param {Function} MaybeDerive Class to test
 * @param {Function} Base Base class to test against
 */
export default function kindOf(MaybeDerive, Base) {
  return (
    MaybeDerive === Base ||
    (MaybeDerive && MaybeDerive.prototype instanceof Base)
  );
}
