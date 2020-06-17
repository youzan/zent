import { IPickerType } from '../types';
import { formatDate } from '../utils/index';
import { II18nLocaleTimePicker } from '../../i18n';
import { getYear, getQuarter, startOfWeek, endOfWeek } from 'date-fns';

/**
 * 选中日期对应的展示text
 */
export interface IUseInputTextParams {
  selected: Date;
  format: string;
  i18n: II18nLocaleTimePicker;
  type: IPickerType;
  options?: any;
}
export default function useInputText({
  selected,
  format,
  i18n,
  type,
  options = {},
}: IUseInputTextParams) {
  let text = '';
  // quarter
  if (type === 'quarter') {
    text = selected
      ? i18n.panel.yearQuarterName({
          year: getYear(selected),
          quarter: getQuarter(selected) - 1,
        })
      : '';
  }
  // week
  else if (type === 'week') {
    const dates = [
      startOfWeek(selected, options),
      endOfWeek(selected, options),
    ];
    text = selected
      ? [formatDate(dates[0], format), formatDate(dates[1], format)].join(
          `  ${i18n.to}  `
        )
      : '';
  } else {
    text = selected ? formatDate(selected, format) : '';
  }
  return text;
}
