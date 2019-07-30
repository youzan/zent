const startOfDay = require('date-fns/start_of_day');
const startOfMonth = require('date-fns/start_of_month');
const endOfDay = require('date-fns/end_of_day');

import formatBase from '../../utils/date/formatDate';
import parseBase from '../../utils/date/parseDate';

import { getLocale } from '../../i18n/time-locale';

import { CURRENT_MONTH, ONEDAY, TIME_BEGIN } from '../constants';

export const padLeft = val => {
  return val < 10 ? `0${val}` : val;
};

export const getMonthStr = val => {
  return `${val.getFullYear()}-${padLeft(val.getMonth() + 1)}`;
};

export const getDateStr = val => {
  return `${val.getFullYear()}-${padLeft(val.getMonth() + 1)}-${val.getDate()}`;
};

export const isSameDate = (val, cmp) => {
  return (
    val.getFullYear() === cmp.getFullYear() &&
    val.getMonth() === cmp.getMonth() &&
    val.getDate() === cmp.getDate()
  );
};

export const isCurrentMonth = val => {
  return val.getMonth() === CURRENT_MONTH;
};

export const isBeforeMonth = (val, cpr) => {
  if (val.getFullYear() < cpr.getFullYear()) {
    return true;
  }
  return (
    val.getFullYear() === cpr.getFullYear() && val.getMonth() < cpr.getMonth()
  );
};

export const isAfterMonth = (val, cpr) => {
  if (val.getFullYear() > cpr.getFullYear()) {
    return true;
  }
  return (
    val.getFullYear() === cpr.getFullYear() && val.getMonth() > cpr.getMonth()
  );
};

export const goDays = (val, diff) => {
  return new Date(val.getTime() + diff * ONEDAY);
};

export const goMonths = (val, diff) => {
  const cp = new Date(val);
  return new Date(cp.getFullYear(), cp.getMonth() + diff, 1);
};

export const goYears = (val, diff) => {
  const cp = new Date(val);
  return new Date(cp.setFullYear(cp.getFullYear() + diff));
};

export const setSameDate = (val, target) => {
  val.setFullYear(target.getFullYear());
  val.setMonth(target.getMonth());
  val.setDate(target.getDate());
  return val;
};

/**
 * add by fancy to inject i18n
 * simple wrapper for formatDate in zan-utils
 *
 * @param {Date|number} date The date to format
 * @param {string} format
 * @param {string|object} locale the i18n setting for fecha
 * @returns {strning} format result by zan-utils
 */
export function formatDate(date, format, locale = getLocale()) {
  return formatBase(date, format, locale);
}

/**
 * add by fancy to inject i18n
 * simple wrapper for parseDate in zan-utils
 *
 * @param {string} dateStr Date string to parse
 * @param {string} format
 * @param {string|object} locale the i18n setting for fecha
 */
export function parseDate(dateStr, format, locale = getLocale()) {
  return parseBase(dateStr, format, locale);
}

export function monthStart(date = new Date()) {
  return startOfMonth(date);
}

export function dayStart(date = new Date()) {
  return startOfDay(date);
}

export function dayEnd(date = new Date()) {
  return endOfDay(date);
}

export function setTime(date: Date, time: Date | string = TIME_BEGIN): Date {
  let timeArr;
  if (time instanceof Date) {
    timeArr = [time.getHours(), time.getMinutes(), time.getSeconds()];
  } else {
    timeArr = time.split(':');
  }

  const dateTimeArr: any = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    ...timeArr,
  ];
  return new (Date as any)(...dateTimeArr);
}

export const commonFns = {
  goDays,
  goMonths,
  goYears,
  setTime,
  dayStart,
  dayEnd,
  parseDate,
  formatDate,
};
