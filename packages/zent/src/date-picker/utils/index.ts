import formatBase from '../../utils/date/formatDate';
import parseBase from '../../utils/date/parseDate';

import { getLocale } from '../../i18n/time-locale';

/**
 *
 * parse date
 * @param {string} dateStr Date string to parse
 * @param {string} format
 * @param {string|object} locale the i18n setting for fecha
 * @returns {Date}
 */
export function parseDate(
  dateValue: string | number | Date,
  format: string,
  locale = getLocale()
) {
  return dateValue ? parseBase(dateValue, format, locale) : null;
}

/**
 *
 * @param {Date|number} date The date to format
 * @param {string} format
 * @param {string|object} locale the i18n setting for fecha
 * @returns {strning} format result
 */
export function formatDate(date, format, locale = getLocale()) {
  return formatBase(date, format, locale);
}
/**
 *
 * @param {Date} target
 * @returns {Date}
 */
export const cloneFromDate = target => {
  return new Date(target.getFullYear(), target.getMonth(), target.getDate());
};
