const toString = Object.prototype.toString;

export default function isObject(value?: any): boolean {
  return toString.call(value) === '[object Object]';
}
