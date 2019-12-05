const toString = Object.prototype.toString;

export default function isDate(value?: any): value is Date {
  return toString.call(value) === '[object Date]';
}
