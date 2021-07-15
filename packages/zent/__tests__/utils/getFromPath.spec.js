import getFromPath from '../../src/utils/getFromPath';

const value = {
  a: {
    b: {
      c: {
        d: 1,
      },
    },
    e: 2,
  },
};

describe('getFromPath', () => {
  it('nested object', () => {
    expect(getFromPath(value, 'a.b.c.d')).toBe(1);
    expect(getFromPath(value, 'a.ff', 20)).toBe(20);
    expect(getFromPath(value, 'aaa.ffff')).toBe(undefined);
    expect(getFromPath(value, 'a.e', 20)).toBe(2);
    expect(getFromPath(value)).toBe(undefined);
    expect(getFromPath(value, null, 20)).toBe(20);
  });

  it('array path', () => {
    expect(getFromPath(value, ['a', 'b', 'c', 'd'])).toBe(1);
    expect(getFromPath(value, ['a', 'ff'], 20)).toBe(20);
    expect(getFromPath(value, ['aaa', 'fff'])).toBe(undefined);
    expect(getFromPath(value, ['a', 'e'], 20)).toBe(2);
  });
});
