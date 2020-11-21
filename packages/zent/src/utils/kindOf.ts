/**
 * Tests whether MaybeDerive is a covariant of Base
 */
export default function kindOf(MaybeDerive: any | string, Base: any) {
  return MaybeDerive === Base || MaybeDerive?.prototype instanceof Base;
}
