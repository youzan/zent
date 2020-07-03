import { getYear, getQuarter, startOfWeek, endOfWeek } from 'date-fns';
import { formatDate, formatDateRange } from './index';
import { II18nLocaleTimePicker } from '../../i18n';
import { IWeekOption } from '../types';
/**
 * 根据format可直接转化为text
 */
export function formatText(selected: Date, format: string): string {
  return selected ? formatDate(selected, format) : '';
}
/**
 * 自定义季度text
 * @param selected
 * @param i18n
 */
export function quarterFormatText(
  selected: Date,
  i18n: II18nLocaleTimePicker
): string {
  return selected
    ? i18n.panel.yearQuarterName({
        year: getYear(selected),
        quarter: getQuarter(selected) - 1,
      })
    : '';
}
/**
 * 自定义周text
 * @param selected
 * @param i18n
 * @param format
 * @param options
 */
export function weekFormatText(
  selected: Date,
  format: string,
  options: IWeekOption
): string[] {
  const dates =
    selected &&
    ([startOfWeek(selected, options), endOfWeek(selected, options)] as [
      Date,
      Date
    ]);
  return selected ? formatDateRange(dates, format) : null;
}

export function formatTextRange(
  selected: [Date, Date],
  format: string
): string[] {
  return formatDateRange(selected, format);
}
