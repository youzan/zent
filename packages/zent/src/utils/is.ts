/**
 * Accessinng Object's property is deadly slow in Safari
 */
const is = Object.is;

function polyfill(x: any, y: any) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  }
  // Step 6.a: NaN == NaN
  return x !== x && y !== y; // eslint-disable-line
}

export default typeof is === 'function' ? is : polyfill;
