export const INPUT_WIDTH = 240;
export const SINGLE_INPUT_WIDTH = 136;
export const COMBINED_INPUT_WIDTH = 360;

export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const MONTH_FORMAT = 'YYYY-MM';
export const YEAR_FORMAT = 'YYYY';

export const triggerCommonProps = [
  'width',
  'name',
  'format',
  'seperator',
  'disabled',
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
  selectedDate: null,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  width: INPUT_WIDTH,
  disabled: false,
  canClear: true,
};
