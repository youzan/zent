const hasOwn = Object.prototype.hasOwnProperty;

// `Object` is the type we want here
// eslint-disable-next-line @typescript-eslint/ban-types
export function hasOwnProperty(obj: Object, prop: PropertyKey): boolean {
  return hasOwn.call(obj, prop);
}
