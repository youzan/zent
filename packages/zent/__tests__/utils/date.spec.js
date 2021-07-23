import { getValidDate } from '../../src/utils/date/helpers';
import parseDate from '../../src/utils/date/parseDate';

describe('getValidDate', () => {
  it('throws when passed undefined', () => {
    expect(() => getValidDate()).toThrow();
  });

  it('string', () => {
    expect(getValidDate('2019/01/02')).toEqual(new Date('2019/01/02'));
    expect(getValidDate('2019-01-02')).toEqual(new Date('2019-01-02'));
  });

  it('number', () => {
    const now = Date.now();
    expect(getValidDate(now)).toEqual(new Date(now));
  });

  it('date', () => {
    const now = new Date();
    expect(getValidDate(now)).toEqual(now);
  });
});

describe('parseDate', () => {
  it('Date', () => {
    const now = new Date();
    expect(parseDate(now)).toEqual(now);
    expect(parseDate('2019-01-02', 'xxx-f-d-')).toBe(null);
    expect(parseDate(now.getTime()).getTime()).toBe(now.getTime());
    expect(parseDate('2019-01-02', 'YYYY-MM-DD').getTime()).toBe(
      new Date(2019, 0, 2).getTime()
    );
  });
});
