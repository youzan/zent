import * as Ut from 'datetimepicker/utils';
import {
  formatDate,
  parseDate,
  maybeParseDate,
  dayStart,
  setTime
} from 'datetimepicker/utils/date';

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
    const {
      padLeft,
      getMonthStr,
      getDateStr,
      isSameDate,
      isCurrentMonth,
      isBeforeMonth,
      isAfterMonth,
      goDays,
      goMonths,
      goYears
    } = Ut;

    // all arg with toString/Number() return NaN will return itself
    // NOTE: no typecheck in it and with no error throw when has array as arg
    expect(padLeft()).toBe();
    expect(padLeft('1')).toBe('01');
    expect(padLeft('10')).toBe('10');
    expect(padLeft(10)).toBe(10);

    // expect a Date Obj as arg
    expect(getMonthStr(new Date(2000, 0, 1))).toBe('2000-01');
    expect(() => {
      getMonthStr({});
    }).toThrow();

    // NOTE: date number without padLeft
    expect(getDateStr(new Date(2000, 0, 1))).toBe('2000-01-1');

    expect(
      isSameDate(new Date(2010, 0, 10, 23, 59), new Date(2010, 0, 10, 0, 1))
    ).toBe(true);
    expect(
      isSameDate(new Date(2010, 0, 10, 23, 59), new Date(2010, 0, 11, 0, 1))
    ).toBe(false);

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

describe('formatDate', () => {
  const DAY = new Date(2017, 1, 14, 21, 27, 22);
  // const UTC_DAY = new Date(Date.UTC(2017, 1, 14, 21, 27, 22));
  it('formatDate works fine with flag supported', () => {
    // NOTE: formatDate will parseDate arg[0] using default mask if only one string arg is provided
    // expect(formatDate('2016-2-14')).toBe('周日 2月 14 2016 00:00:00');

    // // can only pass mask string which has no number in it, Date.now() will be formatDateed
    // expect(formatDate('YYYY MM DD')).toBe(formatDate(new Date(), 'YYYY MM DD'));

    // default behavior
    expect(formatDate(DAY)).toBe('周二 2月 14 2017 21:27:22');
    expect(formatDate(DAY, 'ddd MMM DD YYYY HH:mm:ss')).toBe(
      '周二 2月 14 2017 21:27:22'
    );

    // local time has jet lag with UTC time
    // expect(formatDate(UTC_DAY, 'MM DD')).toBe('02 15');
    // expect(formatDate(UTC_DAY, 'UTC:MM DD')).toBe('UTC:02 15');

    // with unsupported flag, formatDate return it
    expect(formatDate(DAY, 'YYYYOOOO')).toBe('2017OOOO');

    // support insert flag string through toggle " or '
    expect(formatDate(DAY, 'YYYY"dd"')).toBe('2017dd');

    // YYYY|yy
    expect(formatDate(DAY, 'YY')).toBe('17');
    expect(formatDate(DAY, 'YYYY')).toBe('2017');

    // m|MM|MMM|MMMm
    expect(formatDate(DAY, 'M')).toBe('2');
    expect(formatDate(DAY, 'MM')).toBe('02');
    expect(formatDate(DAY, 'MMM')).toBe('2月');
    expect(formatDate(DAY, 'MMMM')).toBe('二月');

    // d|dd|ddd|dddd
    expect(formatDate(DAY, 'D')).toBe('14');
    expect(formatDate(DAY, 'DD')).toBe('14');
    expect(formatDate(DAY, 'ddd')).toBe('周二');
    expect(formatDate(DAY, 'dddd')).toBe('星期二');
    expect(formatDate(DAY, 'Do')).toBe('14th');

    // h|hh|H|HH
    expect(formatDate(DAY, 'h')).toBe('9');
    expect(formatDate(DAY, 'hh')).toBe('09');
    expect(formatDate(DAY, 'H')).toBe('21');
    expect(formatDate(DAY, 'HH')).toBe('21');

    // M|MM
    expect(formatDate(DAY, 'm')).toBe('27');
    expect(formatDate(DAY, 'mm')).toBe('27');

    // // l|L
    // expect(formatDate(DAY, 'l')).toBe('000');
    // expect(formatDate(DAY, 'L')).toBe('00');

    // // t|tt|T|TT
    // expect(formatDate(DAY, 't')).toBe('p');
    // expect(formatDate(DAY, 'tt')).toBe('pm');
    // expect(formatDate(DAY, 'T')).toBe('P');
    // expect(formatDate(DAY, 'TT')).toBe('PM');

    // // o
    // expect(formatDate(DAY, 'o')).toBe('+0800');
    // expect(formatDate(DAY, 'UTC:o')).toBe('+0000');

    // // S
    // expect(formatDate(DAY, 'dS')).toBe('14th');
    // expect(formatDate(new Date(1999, 0, 1), 'dS')).toBe('1st');
    // expect(formatDate(new Date(1999, 0, 2), 'dS')).toBe('2nd');
    // expect(formatDate(new Date(1999, 0, 3), 'dS')).toBe('3rd');

    // Z
    // NOTE: 时区取决于Date对象的生成过程, 一般为local
    // expect(formatDate(DAY, 'Z')).toBe('CST');
    // expect(formatDate(UTC_DAY, 'Z')).toBe('CST');
    // expect(formatDate(new Date('2017/02/14 12:00:00+0000'), 'Z')).toBe('CST');
  });

  it('formatDate and parseDate has some default mask', () => {
    expect(formatDate(DAY, 'shortDate')).toBe('2/14/17');
    expect(formatDate(DAY, 'mediumDate')).toBe('2月 14, 2017');
    expect(formatDate(DAY, 'longDate')).toBe('二月 14, 2017');
    expect(formatDate(DAY, 'fullDate')).toBe('星期二, 二月 14, 2017');
    expect(formatDate(DAY, 'shortTime')).toBe('21:27');
    expect(formatDate(DAY, 'mediumTime')).toBe('21:27:22');
    expect(formatDate(DAY, 'longTime')).toBe('21:27:22.000');
    // expect(formatDate(DAY, 'isoDate')).toBe('2017-02-14');
    // expect(formatDate(DAY, 'isoTime')).toBe('21:27:22');
    // expect(formatDate(DAY, 'isoDateTime')).toBe('2017-02-14T21:27:22');
    // expect(formatDate(UTC_DAY, 'isoUtcDateTime')).toBe('2017-02-14T21:27:22Z');
  });

  it('formatDate support I18n(only zh and en)', () => {
    expect(formatDate(DAY, 'fullDate', { locale: 'en' })).toBe(
      'Tuesday, February 14, 2017'
    );
    expect(formatDate(DAY, 'mediumDate', { locale: 'en' })).toBe(
      'Feb 14, 2017'
    );
  });
});

describe('parseDate && maybeParseDate', () => {
  const DAY = new Date(2017, 1, 14, 21, 27, 22);

  // formatDate 的逆过程, 支持两种直接返回 Date 对象的用法.
  it('return Date when recieve number or dateObj as arg[0]', () => {
    // expect(parseDate(Date.parse(DAY))).toEqual(DAY);
    expect(parseDate(DAY)).toBe(DAY);
    expect(maybeParseDate(DAY)).toBe(DAY);

    expect(parseDate('2017 02 14 21:27:22', 'YYYY MM DD HH:mm:ss')).toEqual(
      DAY
    );
    expect(
      maybeParseDate('2017 02 14 21:27:22', 'YYYY MM DD HH:mm:ss')
    ).toEqual(DAY);

    // When flags cant find corresponding in date string, will return false
    // BUG: maybe throw an error?
    expect(parseDate('17 01 14 21:27:22', 'YYYY')).toBe(false);

    // NOTE: parseDate only support numbers
    // expect(parseDate('3月', 'MMM')).toBe(false);
  });
});

describe('dayStart', () => {
  const DAY = new Date(2017, 1, 14, 21, 27, 22);

  it('return day with hours/minutes/seconds equal 0', () => {
    expect(dayStart(DAY).getHours()).toBe(0);
    expect(dayStart(DAY).getMinutes()).toBe(0);
    expect(dayStart(DAY).getSeconds()).toBe(0);
  });
});

describe('setTime', () => {
  const DAY = new Date(2017, 1, 14, 21, 27, 22);
  const TIME = '09:11:48';
  it('default set time to 00:00:00 if user does not pass time', () => {
    const ret = setTime(DAY);
    expect(ret.getHours()).toBe(0);
    expect(ret.getMinutes()).toBe(0);
    expect(ret.getSeconds()).toBe(0);
  });

  it('set time to user specified time', () => {
    const ret = setTime(DAY, TIME);
    expect(ret.getHours()).toBe(9);
    expect(ret.getMinutes()).toBe(11);
    expect(ret.getSeconds()).toBe(48);
  });
});
