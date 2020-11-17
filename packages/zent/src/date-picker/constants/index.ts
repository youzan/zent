import noop from '../../utils/noop';
import { IValueType, RangeTime } from '../types';

export const INPUT_WIDTH = 240;
export const SINGLE_INPUT_WIDTH = 136;
export const COMBINED_INPUT_WIDTH = 360;

export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const MONTH_FORMAT = 'YYYY-MM';
export const YEAR_FORMAT = 'YYYY';

export const emptyTimeRange: RangeTime = ['', ''];
// 年份范围：1840-3000
export const MIN_YEAR = 1840;
export const MAX_YEAR = 3000;
// (3000 - 1840) / 12
export const MAX_PAGE = 96;

export const triggerCommonProps = [
  'width',
  'name',
  'format',
  'seperator',
  'canClear',
  'placeholder',
] as const;

export const timePanelProps = [
  'format',
  'hourStep',
  'minuteStep',
  'secondStep',
] as const;

export const defaultTimePickerProps = {
  format: TIME_FORMAT,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  canClear: true,
};

export const defaultDatePickerCommonProps = {
  onChange: noop,
  valueType: 'string' as IValueType,
  canClear: true,
  disabledDate: () => false,
  onOpen: noop,
  onClose: noop,
};
