/**
 * Tests whether MaybeDerive is a covariant of Base
 */
export default function kindOf(MaybeDerive: Function | string, Base: Function) {
  return (
    MaybeDerive === Base ||
    (MaybeDerive && (MaybeDerive as any).prototype instanceof Base)
  );
}
