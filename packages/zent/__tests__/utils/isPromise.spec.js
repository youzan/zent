import isPromise from '../../src/utils/isPromise';

describe('isPromise', () => {
  it('returns true if argument is a promise', () => {
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
    expect(isPromise({})).toBe(false);
    expect(isPromise({ then: 1 })).toBe(false);
    expect(isPromise(() => {})).toBe(false);

    expect(isPromise(new Promise(x => x(1)))).toBe(true);
  });
});
