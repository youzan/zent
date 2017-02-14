import * as Ut from '../src/utils';
import { format, parse } from '../src/utils/format';

/**
 * Utnit_Test for Uttility fUtnctions of DateTimePicker Component
 */

describe('Utils', () => {
  it('The Ut contains some CONSTANTS', () => {
    expect(Ut.CURRENT instanceof Date).toBe(true);
    expect(Ut.CURRENT_DAY instanceof Date).toBe(true);
    expect(typeof Ut.CURRENT_YEAR).toBe('number');
    expect(typeof Ut.CURRENT_MONTH).toBe('number');
    expect(typeof Ut.CURRENT_DATE).toBe('number');
    expect(Ut.ONEDAY).toBe(86400000);
  });

  it('Ut has some utils methods as package of Date Object', () => {
    const { padLeft, getMonthStr, getDateStr, isSameDate, isCurrentMonth, isBeforeMonth, isAfterMonth, goDays, goMonths, goYears } = Ut;

    // all arg with toString/Number() return NaN will return itself
    // NOTE: no typecheck in it and with no error throw when has array as arg
    expect(padLeft()).toBe();
    expect(padLeft('1')).toBe('01');
    expect(padLeft('10')).toBe('10');
    expect(padLeft(10)).toBe(10);

    // expect a Date Obj as arg
    expect(getMonthStr(new Date(2000, 0, 1))).toBe('2000-01');
    expect(() => { getMonthStr({}) }).toThrow();

    // NOTE: date number without padLeft
    expect(getDateStr(new Date(2000, 0, 1))).toBe('2000-01-1');

    expect(isSameDate(new Date(2010, 0, 10, 23, 59), new Date(2010, 0, 10, 0, 1))).toBe(true);
    expect(isSameDate(new Date(2010, 0, 10, 23, 59), new Date(2010, 0, 11, 0, 1))).toBe(false);

    // only compare month number
    expect(isCurrentMonth(Ut.CURRENT)).toBe(true);
    expect(isCurrentMonth(new Date(1999, Ut.CURRENT_MONTH, 12))).toBe(true);

    expect(isBeforeMonth(new Date(1991, 7), new Date(2000, 7))).toBe(true);
    expect(isBeforeMonth(new Date(1991, 7), new Date(1989, 7))).toBe(false);
    expect(isBeforeMonth(new Date(1991, 7), new Date(1991, 6))).toBe(false);
    expect(isBeforeMonth(new Date(1991, 7), new Date(1991, 8))).toBe(true);

    expect(isAfterMonth(new Date(1991, 7), new Date(1968, 7))).toBe(true);
    expect(isAfterMonth(new Date(1991, 7), new Date(1998, 7))).toBe(false);
    expect(isAfterMonth(new Date(1991, 7), new Date(1991, 8))).toBe(false);
    expect(isAfterMonth(new Date(1991, 7), new Date(1991, 5))).toBe(true);

    expect(goDays(new Date(1991, 6, 16), 12).getDate()).toBe(28);
    expect(goDays(new Date(1991, 6, 16), 22).getDate()).toBe(7);
    expect(goDays(new Date(1991, 6, 16), -12).getDate()).toBe(4);
    expect(goDays(new Date(1991, 6, 16), -22).getDate()).toBe(24);

    expect(goMonths(new Date(1991, 6), 1).getMonth()).toBe(7);
    expect(goMonths(new Date(1991, 6), -1).getMonth()).toBe(5);
    expect(goMonths(new Date(1991, 6), -10).getMonth()).toBe(8);
    expect(goMonths(new Date(1991, 6), 10).getMonth()).toBe(4);

    expect(goYears(new Date(1991, 6), 1).getFullYear()).toBe(1992);
    expect(goYears(new Date(1991, 6), 10).getFullYear()).toBe(2001);
    expect(goYears(new Date(1991, 6), -10).getFullYear()).toBe(1981);
    expect(goYears(new Date(1991, 6), -1).getFullYear()).toBe(1990);
  });
});

describe('format', () => {
  const DAY = new Date(2017, 1, 14, 21, 27, 22);
  const UTC_DAY = new Date(Date.UTC(2017, 1, 14, 21, 27, 22));
  it('format works fine with flag supported', () => {
    // NOTE: format will parse arg[0] using default mask if only one string arg is provided
    expect(format('2016-2-14')).toBe('周日 2月 14 2016 00:00:00');
    expect(format('yyyy mm dd')).toBe(format(new Date(), 'yyyy mm dd'));
    expect(format(DAY)).toBe('周二 2月 14 2017 21:27:22');
    expect(format(DAY, 'ddd mmm dd yyyy HH:MM:ss')).toBe('周二 2月 14 2017 21:27:22');
    expect(format(DAY, 'yyyy-mm')).toBe('2017-02');

    // local time has jet lag with UTC time
    expect(format(UTC_DAY, 'mm dd')).toBe('02 15');
    expect(format(UTC_DAY, 'UTC:mm dd')).toBe('02 14');

    // with unsupported flag, format return it
    expect(format(DAY, 'yyyyOOOO')).toBe('2017OOOO');

    // support insert flag string through toggle " or '
    expect(format(DAY, 'yyyy"dd"')).toBe('2017dd');
  });
});
