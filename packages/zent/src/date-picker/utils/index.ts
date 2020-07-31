import formatBase from '../../utils/date/formatDate';
import parseBase from '../../utils/date/parseDate';

import { SingleDate, RangeDate, DateNullArray } from '../types';
export * from './getValueInRangePicker';
export * from './getValueInSinglePicker';
export * from './dateUtils';
export { parseBase, formatBase };
/**
 *
 * parse date
 * @param {string} dateStr Date string to parse
 * @param {string} format
 * @returns {Date}
 */
export function parseDate(
  format: string,
  dateValue?: string | number | Date | null
): Date | null {
  return dateValue ? parseBase(dateValue, format) : null;
}

/**
 * 空值处理
 * @param {Date|number|string} date The date to format
 * @param {string} format
 * @returns {string} format result
 */
export function formatDate(format: string, date?: SingleDate | null): string {
  return date ? formatBase(date, format) : '';
}

/**
 * 空值处理
 * format 日期范围数组
 * @param dates 日期数组
 * @param format
 */
export function formatDateRange(
  dates: [SingleDate | null, SingleDate | null],
  format: string
): [string, string] {
  return [formatDate(format, dates[0]), formatDate(format, dates[1])];
}

/**
 * parse 日期范围数组
 * @param dates 日期数组
 * @param format
 */
export function parseDateRange(
  dates: RangeDate,
  format: string
): DateNullArray {
  return [parseDate(format, dates[0]), parseDate(format, dates[1])];
}
