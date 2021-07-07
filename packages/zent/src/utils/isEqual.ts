/**
 * This is a modified version from underscore.
 * https://github.com/jashkenas/underscore/blob/master/underscore.js
 *
 * With some differences:
 * - It's iterative
 * - Bug fixes regarding NaN, 0 and -0 values
 * - Throws on unsupported value types, such as Map/Set/WeakMap/WeakSet
 */
import { hasOwnProperty } from './hasOwn';

// We don't support symbols as object keys, they're expensive
type ObjectKey = string | number;

interface ICompareGeneric {
  type: 'generic';
  a: any;
  b: any;
}

interface ICompareArray {
  type: 'array';
  a: any[];
  b: any[];
  size: number;
  index: number;
}

interface ICompareObject {
  type: 'object';
  a: Record<ObjectKey, any>;
  b: Record<ObjectKey, any>;
  keys: ObjectKey[];
  size: number;
  index: number;
}

interface ICompareChildrenDone {
  type: 'children-done';
}

type CompareOperation =
  | ICompareGeneric
  | ICompareArray
  | ICompareObject
  | ICompareChildrenDone;

const toString = Object.prototype.toString;
const valueOfSymbol = Symbol.prototype.valueOf;
const objKeys = Object.keys;
const objIs = Object.is;

/**
 * This function is non-recursive, and handles cyclic values.
 * It ignores symbol key properties in objects.
 * @param value
 * @param other
 */
export default function isEqual(value: any, other: any): boolean {
  const stack: CompareOperation[] = [{ type: 'generic', a: value, b: other }];
  const aStack: any[] = [];
  const bStack: any[] = [];

  while (stack.length > 0) {
    const op = stack.pop();

    if (op.type === 'generic') {
      const { a, b } = op;

      if (objIs(a, b)) {
        continue;
      }

      // Exhaust primitive checks
      const type = typeof a;
      if (type !== 'function' && type !== 'object' && typeof b !== 'object') {
        return false;
      }

      // a and b must be non primitive values from here

      // Different types
      const tag: string = toString.call(a);
      if (tag !== toString.call(b)) {
        return false;
      }

      // RegExps are coerced to strings for comparison
      // Primitives and their corresponding object wrappers are equivalent;
      // thus, "5" is equivalent to new String("5")
      if (tag === '[object RegExp]' || tag === '[object String]') {
        if ('' + a !== '' + b) {
          return false;
        }
        continue;
      }

      if (tag === '[object Number]') {
        if (!objIs(+a, +b)) {
          return false;
        }

        continue;
      }

      // Coerce dates and booleans to numeric primitive values.
      // Dates are compared by their millisecond representations.
      // Note that invalid dates with millisecond representations of NaN are not equivalent.
      if (tag === '[object Date]' || tag === '[object Boolean]') {
        if (+a !== +b) {
          return false;
        }
        continue;
      }

      // Symbol wrapper can be created with Object(sym), Object(sym) !== Object(sym)
      // So we unwrap them before comparison
      // Symbol only equals to itself
      if (tag === '[object Symbol]') {
        if (valueOfSymbol.call(a) !== valueOfSymbol.call(b)) {
          return false;
        }

        continue;
      }

      const areArrays = tag === '[object Array]';
      if (!areArrays) {
        // functions
        if (typeof a !== 'object' || typeof b !== 'object') {
          return false;
        }

        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        const aCtor = a.constructor;
        const bCtor = b.constructor;
        if (
          aCtor !== bCtor &&
          !(
            typeof aCtor === 'function' &&
            aCtor instanceof aCtor &&
            typeof bCtor === 'function' &&
            bCtor instanceof bCtor
          ) &&
          'constructor' in a &&
          'constructor' in b
        ) {
          return false;
        }
      }

      // Assume equality for cyclic structures. The algorithm for detecting cyclic
      // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

      // Initializing stack of traversed objects.
      // It's done here since we only need them for objects and arrays comparison.
      let length = aStack.length;
      while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a) {
          if (bStack[length] === b) {
            break;
          }
          return false;
        }
      }
      if (length >= 0) {
        continue;
      }

      // Add the first object to the stack of traversed objects.
      aStack.push(a);
      bStack.push(b);
      // Remove from the stack of traversed objects.
      stack.push({
        type: 'children-done',
      });

      // Recursively compare objects and arrays.
      if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        const len = a.length;
        if (len !== b.length) {
          return false;
        }

        if (len === 0) {
          continue;
        }

        // Deep compare the contents, ignoring non-numeric properties.
        // Iterate inside our stack, don't push all items onto stack at once
        stack.push({
          type: 'array',
          size: len,
          index: 0,
          a,
          b,
        });
      } else if (tag === '[object Object]') {
        // Deep compare objects.
        const keys = objKeys(a);
        const len = keys.length;

        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if (objKeys(b).length !== len) {
          return false;
        }

        if (len === 0) {
          continue;
        }

        // Deep compare each member
        // Iterate inside our stack, don't push all items onto stack at once
        stack.push({
          type: 'object',
          a,
          b,
          keys,
          size: len,
          index: 0,
        });
      } else {
        throw new Error(`isEqual not implemented for ${tag}`);
      }
    } else if (op.type === 'array') {
      const { a, b, size, index } = op;

      // next item
      if (index < size - 1) {
        op.index++;
        stack.push(op);
      }

      stack.push({
        type: 'generic',
        a: a[index],
        b: b[index],
      });
    } else if (op.type === 'object') {
      const { a, b, keys, size, index } = op;

      const k = keys[index];
      if (!hasOwnProperty(b, k)) {
        return false;
      }

      // next item
      if (index < size - 1) {
        op.index++;
        stack.push(op);
      }

      stack.push({
        type: 'generic',
        a: a[k],
        b: b[k],
      });
    } else if (op.type === 'children-done') {
      aStack.pop();
      bStack.pop();
    }
  }

  return true;
}
