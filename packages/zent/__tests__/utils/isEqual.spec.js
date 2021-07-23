/* eslint-disable no-new-wrappers */

// All tests copied from https://underscorejs.org/test/objects.js

import isEqual from '../../src/utils/isEqual';

describe('isEqual', () => {
  const ok = (val, desc) => {
    it(desc, () => {
      expect(val).toBe(true);
    });
  };
  const assert = {
    ok,
    strictEqual: (a, b, desc) => ok(a === b, desc),
  };

  function First() {
    this.value = 1;
  }
  First.prototype.value = 1;

  function Second() {
    this.value = 1;
  }
  Second.prototype.value = 2;

  // Basic equality and identity comparisons.
  assert.ok(isEqual(null, null), '`null` is equal to `null`');
  assert.ok(isEqual(), '`undefined` is equal to `undefined`');

  assert.ok(!isEqual(0, -0), '`0` is not equal to `-0`');
  assert.ok(
    !isEqual(-0, 0),
    'Commutative equality is implemented for `0` and `-0`'
  );
  assert.ok(!isEqual(null, undefined), '`null` is not equal to `undefined`');
  assert.ok(
    !isEqual(undefined, null),
    'Commutative equality is implemented for `null` and `undefined`'
  );

  // String object and primitive comparisons.
  assert.ok(isEqual('Curly', 'Curly'), 'Identical string primitives are equal');
  assert.ok(
    isEqual(new String('Curly'), new String('Curly')),
    'String objects with identical primitive values are equal'
  );
  assert.ok(
    isEqual(new String('Curly'), 'Curly'),
    'String primitives and their corresponding object wrappers are equal'
  );
  assert.ok(
    isEqual('Curly', new String('Curly')),
    'Commutative equality is implemented for string objects and primitives'
  );

  assert.ok(
    !isEqual('Curly', 'Larry'),
    'String primitives with different values are not equal'
  );
  assert.ok(
    !isEqual(new String('Curly'), new String('Larry')),
    'String objects with different primitive values are not equal'
  );
  assert.ok(
    !isEqual(new String('Curly'), {
      toString() {
        return 'Curly';
      },
    }),
    'String objects and objects with a custom `toString` method are not equal'
  );

  // Number object and primitive comparisons.
  assert.ok(isEqual(75, 75), 'Identical number primitives are equal');
  assert.ok(
    isEqual(new Number(75), new Number(75)),
    'Number objects with identical primitive values are equal'
  );
  assert.ok(
    isEqual(75, new Number(75)),
    'Number primitives and their corresponding object wrappers are equal'
  );
  assert.ok(
    isEqual(new Number(75), 75),
    'Commutative equality is implemented for number objects and primitives'
  );
  assert.ok(
    !isEqual(new Number(0), -0),
    '`new Number(0)` and `-0` are not equal'
  );
  assert.ok(
    !isEqual(0, new Number(-0)),
    'Commutative equality is implemented for `new Number(0)` and `-0`'
  );

  assert.ok(
    !isEqual(new Number(75), new Number(63)),
    'Number objects with different primitive values are not equal'
  );
  assert.ok(
    !isEqual(new Number(63), {
      valueOf() {
        return 63;
      },
    }),
    'Number objects and objects with a `valueOf` method are not equal'
  );

  // Comparisons involving `NaN`.
  assert.ok(isEqual(NaN, NaN), '`NaN` is equal to `NaN`');
  assert.ok(isEqual(new Number(NaN), NaN), 'Object(`NaN`) is equal to `NaN`');
  assert.ok(isEqual(NaN, new Number(NaN)), '`NaN` is equal to Object(`NaN`)');
  assert.ok(!isEqual(61, NaN), 'A number primitive is not equal to `NaN`');
  assert.ok(!isEqual(NaN, 61), '`NaN` is not equal to a number primitive');
  assert.ok(
    !isEqual(new Number(NaN), 61),
    '`NaN` is not equal to a number primitive'
  );
  assert.ok(
    !isEqual(new Number(79), NaN),
    'A number object is not equal to `NaN`'
  );
  assert.ok(!isEqual(Infinity, NaN), '`Infinity` is not equal to `NaN`');
  assert.ok(
    !isEqual(0, new Number(Number.MIN_VALUE)),
    'Number.MIN_VALUE is not equal to 0'
  );

  // Boolean object and primitive comparisons.
  assert.ok(isEqual(true, true), 'Identical boolean primitives are equal');
  assert.ok(
    isEqual(new Boolean(), new Boolean()),
    'Boolean objects with identical primitive values are equal'
  );
  assert.ok(
    isEqual(true, new Boolean(true)),
    'Boolean primitives and their corresponding object wrappers are equal'
  );
  assert.ok(
    isEqual(new Boolean(true), true),
    'Commutative equality is implemented for booleans'
  );
  assert.ok(
    !isEqual(new Boolean(true), new Boolean()),
    'Boolean objects with different primitive values are not equal'
  );

  // Common type coercions.
  assert.ok(
    !isEqual(new Boolean(false), true),
    '`new Boolean(false)` is not equal to `true`'
  );
  assert.ok(
    !isEqual('75', 75),
    'String and number primitives with like values are not equal'
  );
  assert.ok(
    !isEqual(new Number(63), new String(63)),
    'String and number objects with like values are not equal'
  );
  assert.ok(
    !isEqual(75, '75'),
    'Commutative equality is implemented for like string and number values'
  );
  assert.ok(
    !isEqual(0, ''),
    'Number and string primitives with like values are not equal'
  );
  assert.ok(
    !isEqual(1, true),
    'Number and boolean primitives with like values are not equal'
  );
  assert.ok(
    !isEqual(new Boolean(false), new Number(0)),
    'Boolean and number objects with like values are not equal'
  );
  assert.ok(
    !isEqual(false, new String('')),
    'Boolean primitives and string objects with like values are not equal'
  );
  assert.ok(
    !isEqual(12564504e5, new Date(2009, 9, 25)),
    'Dates and their corresponding numeric primitive values are not equal'
  );

  // Dates.
  assert.ok(
    isEqual(new Date(2009, 9, 25), new Date(2009, 9, 25)),
    'Date objects referencing identical times are equal'
  );
  assert.ok(
    !isEqual(new Date(2009, 9, 25), new Date(2009, 11, 13)),
    'Date objects referencing different times are not equal'
  );
  assert.ok(
    !isEqual(new Date(2009, 11, 13), {
      getTime() {
        return 12606876e5;
      },
    }),
    'Date objects and objects with a `getTime` method are not equal'
  );
  assert.ok(
    !isEqual(new Date('Curly'), new Date('Curly')),
    'Invalid dates are not equal'
  );

  // Functions.
  assert.ok(
    !isEqual(First, Second),
    'Different functions with identical bodies and source code representations are not equal'
  );

  // RegExps.
  assert.ok(
    isEqual(/(?:)/gim, /(?:)/gim),
    'RegExps with equivalent patterns and flags are equal'
  );
  assert.ok(isEqual(/(?:)/gi, /(?:)/gi), 'Flag order is not significant');
  assert.ok(
    !isEqual(/(?:)/g, /(?:)/gi),
    'RegExps with equivalent patterns and different flags are not equal'
  );
  assert.ok(
    !isEqual(/Moe/gim, /Curly/gim),
    'RegExps with different patterns and equivalent flags are not equal'
  );
  assert.ok(
    !isEqual(/(?:)/gi, /(?:)/g),
    'Commutative equality is implemented for RegExps'
  );
  assert.ok(
    !isEqual(/Curly/g, {
      source: 'Larry',
      global: true,
      ignoreCase: false,
      multiline: false,
    }),
    'RegExps and RegExp-like objects are not equal'
  );

  // Empty arrays, array-like objects, and object literals.
  assert.ok(isEqual({}, {}), 'Empty object literals are equal');
  assert.ok(isEqual([], []), 'Empty array literals are equal');
  assert.ok(isEqual([{}], [{}]), 'Empty nested arrays and objects are equal');
  assert.ok(
    !isEqual({ length: 0 }, []),
    'Array-like objects and arrays are not equal.'
  );
  assert.ok(
    !isEqual([], { length: 0 }),
    'Commutative equality is implemented for array-like objects'
  );

  assert.ok(
    !isEqual({}, []),
    'Object literals and array literals are not equal'
  );
  assert.ok(
    !isEqual([], {}),
    'Commutative equality is implemented for objects and arrays'
  );

  // Arrays with primitive and object values.
  assert.ok(
    isEqual([1, 'Larry', true], [1, 'Larry', true]),
    'Arrays containing identical primitives are equal'
  );
  assert.ok(
    isEqual([/Moe/g, new Date(2009, 9, 25)], [/Moe/g, new Date(2009, 9, 25)]),
    'Arrays containing equivalent elements are equal'
  );

  // Multi-dimensional arrays.
  let a = [
    new Number(47),
    false,
    'Larry',
    /Moe/,
    new Date(2009, 11, 13),
    ['running', 'biking', new String('programming')],
    { a: 47 },
  ];
  let b = [
    new Number(47),
    false,
    'Larry',
    /Moe/,
    new Date(2009, 11, 13),
    ['running', 'biking', new String('programming')],
    { a: 47 },
  ];
  assert.ok(
    isEqual(a, b),
    'Arrays containing nested arrays and objects are recursively compared'
  );

  // Overwrite the methods defined in ES 5.1 section 15.4.4.
  a.forEach =
    a.map =
    a.filter =
    a.every =
    a.indexOf =
    a.lastIndexOf =
    a.some =
    a.reduce =
    a.reduceRight =
      null;
  b.join =
    b.pop =
    b.reverse =
    b.shift =
    b.slice =
    b.splice =
    b.concat =
    b.sort =
    b.unshift =
      null;

  // Array elements and properties.
  assert.ok(
    isEqual(a, b),
    'Arrays containing equivalent elements and different non-numeric properties are equal'
  );
  a.push('White Rocks');
  assert.ok(!isEqual(a, b), 'Arrays of different lengths are not equal');
  a.push('East Boulder');
  b.push('Gunbarrel Ranch', 'Teller Farm');
  assert.ok(
    !isEqual(a, b),
    'Arrays of identical lengths containing different elements are not equal'
  );

  // Sparse arrays.
  assert.ok(
    isEqual(Array(3), Array(3)),
    'Sparse arrays of identical lengths are equal'
  );
  assert.ok(
    !isEqual(Array(3), Array(6)),
    'Sparse arrays of different lengths are not equal when both are empty'
  );

  const sparse = [];
  sparse[1] = 5;
  assert.ok(isEqual(sparse, [undefined, 5]), 'Handles sparse arrays as dense');

  // Simple objects.
  assert.ok(
    isEqual({ a: 'Curly', b: 1, c: true }, { a: 'Curly', b: 1, c: true }),
    'Objects containing identical primitives are equal'
  );
  assert.ok(
    isEqual(
      { a: /Curly/g, b: new Date(2009, 11, 13) },
      { a: /Curly/g, b: new Date(2009, 11, 13) }
    ),
    'Objects containing equivalent members are equal'
  );
  assert.ok(
    !isEqual({ a: 63, b: 75 }, { a: 61, b: 55 }),
    'Objects of identical sizes with different values are not equal'
  );
  assert.ok(
    !isEqual({ a: 63, b: 75 }, { a: 61, c: 55 }),
    'Objects of identical sizes with different property names are not equal'
  );
  assert.ok(
    !isEqual({ a: 1, b: 2 }, { a: 1 }),
    'Objects of different sizes are not equal'
  );
  assert.ok(
    !isEqual({ a: 1 }, { a: 1, b: 2 }),
    'Commutative equality is implemented for objects'
  );
  assert.ok(
    !isEqual({ x: 1, y: undefined }, { x: 1, z: 2 }),
    'Objects with identical keys and different values are not equivalent'
  );

  // `A` contains nested objects and arrays.
  a = {
    name: new String('Moe Howard'),
    age: new Number(77),
    stooge: true,
    hobbies: ['acting'],
    film: {
      name: 'Sing a Song of Six Pants',
      release: new Date(1947, 9, 30),
      stars: [new String('Larry Fine'), 'Shemp Howard'],
      minutes: new Number(16),
      seconds: 54,
    },
  };

  // `B` contains equivalent nested objects and arrays.
  b = {
    name: new String('Moe Howard'),
    age: new Number(77),
    stooge: true,
    hobbies: ['acting'],
    film: {
      name: 'Sing a Song of Six Pants',
      release: new Date(1947, 9, 30),
      stars: [new String('Larry Fine'), 'Shemp Howard'],
      minutes: new Number(16),
      seconds: 54,
    },
  };
  assert.ok(
    isEqual(a, b),
    'Objects with nested equivalent members are recursively compared'
  );

  // Instances.
  assert.ok(isEqual(new First(), new First()), 'Object instances are equal');
  assert.ok(
    !isEqual(new First(), new Second()),
    'Objects with different constructors and identical own properties are not equal'
  );
  assert.ok(
    !isEqual({ value: 1 }, new First()),
    'Object instances and objects sharing equivalent properties are not equal'
  );
  assert.ok(
    !isEqual({ value: 2 }, new Second()),
    'The prototype chain of objects should not be examined'
  );

  // Circular Arrays.
  (a = []).push(a);
  (b = []).push(b);
  assert.ok(isEqual(a, b), 'Arrays containing circular references are equal');
  a.push(new String('Larry'));
  b.push(new String('Larry'));
  assert.ok(
    isEqual(a, b),
    'Arrays containing circular references and equivalent properties are equal'
  );
  a.push('Shemp');
  b.push('Curly');
  assert.ok(
    !isEqual(a, b),
    'Arrays containing circular references and different properties are not equal'
  );

  // More circular arrays #767.
  a = ['everything is checked but', 'this', 'is not'];
  a[1] = a;
  b = ['everything is checked but', ['this', 'array'], 'is not'];
  assert.ok(
    !isEqual(a, b),
    'Comparison of circular references with non-circular references are not equal'
  );

  // Circular Objects.
  a = { abc: null };
  b = { abc: null };
  a.abc = a;
  b.abc = b;
  assert.ok(isEqual(a, b), 'Objects containing circular references are equal');
  a.def = 75;
  b.def = 75;
  assert.ok(
    isEqual(a, b),
    'Objects containing circular references and equivalent properties are equal'
  );
  a.def = new Number(75);
  b.def = new Number(63);
  assert.ok(
    !isEqual(a, b),
    'Objects containing circular references and different properties are not equal'
  );

  // More circular objects #767.
  a = { everything: 'is checked', but: 'this', is: 'not' };
  a.but = a;
  b = { everything: 'is checked', but: { that: 'object' }, is: 'not' };
  assert.ok(
    !isEqual(a, b),
    'Comparison of circular references with non-circular object references are not equal'
  );

  // Cyclic Structures.
  a = [{ abc: null }];
  b = [{ abc: null }];
  (a[0].abc = a).push(a);
  (b[0].abc = b).push(b);
  assert.ok(isEqual(a, b), 'Cyclic structures are equal');
  a[0].def = 'Larry';
  b[0].def = 'Larry';
  assert.ok(
    isEqual(a, b),
    'Cyclic structures containing equivalent properties are equal'
  );
  a[0].def = new String('Larry');
  b[0].def = new String('Curly');
  assert.ok(
    !isEqual(a, b),
    'Cyclic structures containing different properties are not equal'
  );

  // Complex Circular References.
  a = { foo: { b: { foo: { c: { foo: null } } } } };
  b = { foo: { b: { foo: { c: { foo: null } } } } };
  a.foo.b.foo.c.foo = a;
  b.foo.b.foo.c.foo = b;
  assert.ok(
    isEqual(a, b),
    'Cyclic structures with nested and identically-named properties are equal'
  );

  // Objects without a `constructor` property
  if (Object.create) {
    a = Object.create(null, { x: { value: 1, enumerable: true } });
    b = { x: 1 };
    assert.ok(
      isEqual(a, b),
      'Handles objects without a constructor (e.g. from Object.create'
    );
  }

  function Foo() {
    this.a = 1;
  }
  Foo.prototype.constructor = null;

  const other = { a: 1 };
  assert.strictEqual(
    isEqual(new Foo(), other),
    false,
    'Objects from different constructors are not equal'
  );

  // Tricky object cases val comparisons
  assert.strictEqual(
    isEqual([0], [-0]),
    false,
    'Arrays with 0 and -0 as values are not equal'
  );
  assert.strictEqual(
    isEqual({ a: 0 }, { a: -0 }),
    false,
    'Objects with 0 and -0 as values are not equal'
  );
  assert.strictEqual(
    isEqual([NaN], [NaN]),
    true,
    'Arrays with NaN as value are equal'
  );
  assert.strictEqual(
    isEqual({ a: NaN }, { a: NaN }),
    true,
    'Objects with NaN as values are equal'
  );

  if (typeof Symbol !== 'undefined') {
    const symbol = Symbol('x');
    assert.strictEqual(
      isEqual(symbol, symbol),
      true,
      'A symbol is equal to itself'
    );
    assert.strictEqual(
      isEqual(symbol, Object(symbol)),
      true,
      'Even when wrapped in Object()'
    );
    assert.strictEqual(
      isEqual(Object(symbol), Object(symbol)),
      true,
      'Symbol wrappers with same value are equal'
    );
    assert.strictEqual(
      isEqual(symbol, null),
      false,
      'Different types are not equal'
    );

    const symbolY = Symbol('y');
    assert.strictEqual(
      isEqual(symbol, symbolY),
      false,
      'Different symbols are not equal'
    );

    const sameStringSymbol = Symbol('x');
    assert.strictEqual(
      isEqual(symbol, sameStringSymbol),
      false,
      'Different symbols of same string are not equal'
    );
    assert.strictEqual(
      isEqual(Object(symbol), sameStringSymbol),
      false,
      'Even when wrapped in Object()'
    );
  }
});
