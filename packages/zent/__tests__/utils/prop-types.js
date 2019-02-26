import { validElementType } from 'utils/prop-types';

describe('prop-types', () => {
  it('return true in browser env', () => {
    expect(validElementType({ foobar: 1 }, 'foobar', 'quux')).toBeInstanceOf(
      Error
    );
    expect(validElementType({ a: 'div' }, 'a', 'c')).toBe(undefined);
  });
});
