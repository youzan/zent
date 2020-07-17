import formatBase from '../../utils/date/formatDate';
import parseBase from '../../utils/date/parseDate';

import { RangeDate } from '../types';
export * from './getValueInRangePicker';
export * from './getValueInSinglePicker';
export * from './dateUtils';
export * from './handler';
/**
 *
 * parse date
 * @param {string} dateStr Date string to parse
 * @param {string} format
 * @returns {Date}
 */
export function parseDate(dateValue: string | number | Date, format: string) {
  return dateValue ? parseBase(dateValue, format) : null;
}

/**
 *
 * @param {Date|number} date The date to format
 * @param {string} format
 * @returns {strning} format result
 */
export function formatDate(date, format) {
  return formatBase(date, format);
}

/**
 * format 日期范围数组
 * @param dates 日期数组
 * @param format
 */
export function formatDateRange(dates: [Date, Date], format: string): string[] {
  return [
    dates[0] ? formatDate(dates[0], format) : '',
    dates[1] ? formatDate(dates[1], format) : '',
  ];
}

/**
 * parse 日期范围数组
 * @param dates 日期数组
 * @param format
 */
export function parseDateRange(dates: RangeDate, format: string): [Date, Date] {
  return [parseDate(dates[0], format), parseDate(dates[1], format)];
}
