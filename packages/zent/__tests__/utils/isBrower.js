import isBrowser from 'utils/isBrowser';

describe('isBrowser', () => {
  it('return true in browser env', () => {
    expect(isBrowser).toBe(true);
  });
});
