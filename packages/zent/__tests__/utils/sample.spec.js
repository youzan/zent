import sample from '../../src/utils/sample';

describe('sample', () => {
  it('returns a random element from array', () => {
    expect(sample([1])).toBe(1);
    expect([1, 2].includes(sample([1, 2]))).toBe(true);
  });
});
