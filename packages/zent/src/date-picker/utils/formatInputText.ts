import { getYear, getQuarter, startOfWeek, endOfWeek } from 'date-fns';
import { formatDate, formatDateRange } from './index';
import { II18nLocaleTimePicker } from '../../i18n';
import { IWeekOption, DateNullTuple, StringTuple } from '../types';
/**
 * 根据format可直接转化为text
 */
export function formatText(selected: Date | null, format: string): string {
  return selected ? formatDate(format, selected) : '';
}
/**
 * 自定义季度text
 * @param selected
 * @param i18n
 */
export function quarterFormatText(
  selected: Date | null,
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
  selected: Date | null,
  format: string,
  options: IWeekOption
): StringTuple {
  const dates =
    selected &&
    ([startOfWeek(selected, options), endOfWeek(selected, options)] as [
      Date,
      Date
    ]);
  return dates ? formatDateRange(dates, format) : ['', ''];
}

export function formatTextRange(
  selected: DateNullTuple,
  format: string
): StringTuple {
  return formatDateRange(selected, format);
}
