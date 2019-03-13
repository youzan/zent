import { getValidDate } from 'utils/date/helpers';
import i18n from 'utils/date/i18n';
import parseDate from 'utils/date/parseDate';

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

describe('i18n', () => {
  it('zh', () => {
    const { DoFn } = i18n.zh;

    expect(DoFn(1)).toBe('1st');
    expect(DoFn(2)).toBe('2nd');
    expect(DoFn(3)).toBe('3rd');
    expect(DoFn(4)).toBe('4th');
  });

  it('en', () => {
    const { DoFn } = i18n.en;

    expect(DoFn(1)).toBe('1st');
    expect(DoFn(2)).toBe('2nd');
    expect(DoFn(3)).toBe('3rd');
    expect(DoFn(4)).toBe('4th');
  });
});

describe('parseDate', () => {
  it('Date', () => {
    const now = new Date();
    expect(parseDate(now)).toBe(now);
    expect(parseDate('2019-01-02', 'xxx-f-d-')).toBe(null);
    expect(parseDate(now.getTime()).getTime()).toBe(now.getTime());
    expect(parseDate('2019-01-02', 'YYYY-MM-DD').getTime()).toBe(
      new Date(2019, 0, 2).getTime()
    );
  });
});
