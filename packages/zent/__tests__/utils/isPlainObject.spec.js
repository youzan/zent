import isPlainObject from '../../src/utils/isPlainObject';

describe('isPlainObject', () => {
  it('primitive', () => {
    expect(isPlainObject('str')).toBe(false);
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject(false)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(Symbol.for('symbol'))).toBe(false);
  });

  it('array', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2])).toBe(false);
  });

  it('object', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1, b: 2 })).toBe(true);

    const obj = Object.create(null);
    obj.x = 1;
    expect(isPlainObject(obj)).toBe(true);
  });

  it('function', () => {
    expect(isPlainObject(() => {})).toBe(false);

    const f = () => {};
    f.a = 1;
    f.b = 2;
    expect(isPlainObject(f)).toBe(false);
  });
});
