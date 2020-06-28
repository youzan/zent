export interface IDateCellBase {
  value: Date;
  text: string | number;
  isSelected?: boolean;
  isCurrent?: boolean;
  isDisabled?: boolean;
  isInView?: boolean;
  isHover?: boolean;
  isInRange?: boolean;
  isInHoverRange?: boolean;
}

export type SingleDate = string | number | Date;
export type IValueType = 'date' | 'number' | 'string';
export type RangeType = 'start' | 'end';
export interface IDisabledDateSimple<T = SingleDate> {
  min?: T;
  max?: T;
  includeMin?: boolean;
}
export type IDisabledDate = (val: Date) => boolean | IDisabledDateSimple;
export interface IDatePickerCommonProps<DateValue = SingleDate> {
  value: DateValue;
  onChange: (date: DateValue | [DateValue, DateValue]) => void;
  valueType?: IValueType;
  format?: string;
  defaultDate?: DateValue;
  disabledDate?: IDisabledDate;
  disabled?: boolean;
  canClear?: boolean;
  openPanel?: boolean;
  onOpen?: (type?: RangeType) => void;
  onClose?: (type?: RangeType) => void;
  width?: string | number;
  className?: string;
}

export interface IDisabledTimes {
  disabledHours?: (date?: Date) => number[];
  disabledMinutes?: (hour: number, date?: Date) => number[];
  disabledSeconds?: (hour: number, minute: number, date?: Date) => number[];
}

export type IPickerType = 'date' | 'week' | 'month' | 'quarter' | 'year';

// **** DatePicker ****
export interface ISingleTriggerProps {
  text?: string;
  name?: string;
  value: SingleDate;
  format: string;
  width: number | string;
  canClear: boolean;
  disabled: boolean;
  placeholder?: string;
  onClearInput: (evt: any) => any;
}

export interface ISingleDatePanelProps {
  selected: Date;
  defaultPanelDate: Date;
  rangeDate?: [Date, Date];
  hoverDate?: Date;
  hoverRangeDate?: [Date, Date];
  row?: number;
  col?: number;
  onSelected: (val: Date, status?: boolean) => void;
  disabledPanelDate?: (val: Date) => boolean;
  onChangePanel?: (type: IPickerType) => void;
}

export type ISingleDateBodyProps = Pick<
  ISingleDatePanelProps,
  | 'selected'
  | 'hoverDate'
  | 'rangeDate'
  | 'hoverRangeDate'
  | 'defaultPanelDate'
  | 'onSelected'
  | 'disabledPanelDate'
  | 'row'
  | 'col'
>;
export interface IShowTimeOption<T> {
  format?: string;
  defaultTime?: T;
}
export type IShowTime<T = string> = boolean | IShowTimeOption<T>;

// **** CombinedPicker ****
export interface ICombinedDateRangeProps
  extends IDatePickerCommonProps<[SingleDate, SingleDate]> {
  placeholder?: string[];
  showTime?: IShowTime<string[]>;
  width?: number;
  name?: string[];
}
export interface IRangeTriggerProps {
  value: [SingleDate, SingleDate];
  seperator: string;
  placeholder: string[];
  name?: string[];
  onClearInput: (evt: any) => any;
}

export interface ICombinedDatePanelProps {
  selected: [Date, Date];
  defaultPanelDate: [Date, Date];
  onSelected: (val: [Date, Date], status?: boolean) => void;
  disabledPanelDate: Array<(val: Date) => boolean>;
  hoverDate?: Date;
  hoverRangeDate?: [Date, Date];
  rangeDate?: [Date, Date];
  showTime?: IShowTime<string[]>;
}

// **** TimePicker ****
interface ITimePickerBase {
  selectedDate?: Date;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  format?: string;
  defaultTime?: string;
}
export interface ITimePickerProps
  extends Omit<
      IDatePickerCommonProps<string>,
      'valueType' | 'disabledDate' | 'defaultPanelDate'
    >,
    ITimePickerBase {
  placeholder?: string;
  hiddenIcon?: boolean;
  disabledTimes?: IDisabledTimes;
}
export interface ITimePickerTriggerProps
  extends Omit<ITimePickerProps, 'value' | 'onChange'> {
  selected: string;
  onSelected: (value: string, status?: boolean) => void;
}

export interface ITimePanelProps extends ITimePickerBase {
  disabledTimes: IDisabledTimes;
  selected: string;
  onSelected: (val: string, status?: boolean) => void;
}
export type ITimeUnitType = 'hour' | 'minute' | 'second';

export enum WeekStartsOnMap {
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
}
export type IWeekStartsOnKey = keyof typeof WeekStartsOnMap;
export interface IWeekOption {
  weekStartsOn?: WeekStartsOnMap;
}
export interface IGenerateDateConfig {
  set: (date: number | Date, num: number, option?: IWeekOption) => Date;
  get: (date: number | Date, option?: IWeekOption) => number;
  offsetDate: (date: number | Date, num: number) => Date;
  isSame: (dateLeft: Date, dateRight: Date) => boolean;
  startDate: (date: number | Date, option?: IWeekOption) => Date;
  endDate: (date: number | Date, option?: IWeekOption) => Date;
  circleEndDate?: (date: number | Date) => Date;
}
