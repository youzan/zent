import isDate from '../../src/utils/isDate';

describe('isDate', () => {
  it('date object', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(Date.now())).toBe(false);
  });

  it('other objects', () => {
    expect(isDate('string')).toBe(false);
  });
});
