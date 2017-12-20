import makeDateStr from 'zan-utils/date/makeDateStr';
import makeDateTimeStr from 'zan-utils/date/makeDateTimeStr';
import * as Ut from 'datetimepicker/utils';
import {
  dayStart,
  dayEnd,
  setTime,
  getSeasonFromDate
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

describe('dayStart', () => {
  const DAY = new Date(2017, 1, 14, 21, 27, 22);

  it('return day with hours/minutes/seconds equal 0', () => {
    expect(dayStart(DAY).getHours()).toBe(0);
    expect(dayStart(DAY).getMinutes()).toBe(0);
    expect(dayStart(DAY).getSeconds()).toBe(0);
  });
});

describe('dayEnd', () => {
  const DAY = new Date(2017, 1, 14, 21, 27, 22);

  it('return day with hours/minutes/seconds equal 23:59:59', () => {
    expect(dayEnd(DAY).getHours()).toBe(23);
    expect(dayEnd(DAY).getMinutes()).toBe(59);
    expect(dayEnd(DAY).getSeconds()).toBe(59);
  });

  const TODAY = new Date();
  it("will return end of today if don't pass params", () => {
    expect(makeDateTimeStr(dayEnd())).toBe(`${makeDateStr(TODAY)} 23:59:59`);
  });
});

describe('setTime', () => {
  const DAY = new Date(2017, 1, 14, 21, 27, 22);
  const TIME = '09:11:48';
  const TIMEDATE = new Date(2018, 1, 1, 1, 1, 1);
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

  it('support setTime with date instance', () => {
    const ret = setTime(DAY, TIMEDATE);
    expect(ret.getHours()).toBe(1);
    expect(ret.getMinutes()).toBe(1);
    expect(ret.getSeconds()).toBe(1);
  });
});

describe('getSeasonFromDate', () => {
  let day;
  let season;
  it('should return right season', () => {
    day = new Date(2018, 1, 1);
    season = getSeasonFromDate(day);
    expect(season).toBe(0);

    day = new Date(2018, 4, 1);
    season = getSeasonFromDate(day);
    expect(season).toBe(1);

    day = new Date(2018, 7, 1);
    season = getSeasonFromDate(day);
    expect(season).toBe(2);

    day = new Date(2018, 10, 1);
    season = getSeasonFromDate(day);
    expect(season).toBe(3);
  });
});
