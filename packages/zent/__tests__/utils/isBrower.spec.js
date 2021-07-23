import isBrowser from '../../src/utils/isBrowser';

describe('isBrowser', () => {
  it('return true in browser env', () => {
    expect(isBrowser).toBe(true);
  });
});
