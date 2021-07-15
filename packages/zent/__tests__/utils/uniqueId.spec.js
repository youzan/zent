import uniqueId from '../../src/utils/uniqueId';

describe('uniqueId', () => {
  it('generate a unique id', () => {
    const a = uniqueId();
    const b = uniqueId();
    expect(b === a).toBe(false);
  });

  it('custom prefix', () => {
    const a = uniqueId('foobar');
    const b = uniqueId('foobar');
    expect(b === a).toBe(false);
    expect(b.startsWith('foobar')).toBe(true);
  });
});
