import { IconType } from '../icon';

export type SingleDate = string | number | Date;
export type IValueType = 'date' | 'number' | 'string';
export type RangeType = 'start' | 'end';
export type IPickerType = 'date' | 'week' | 'month' | 'quarter' | 'year';
export enum RangeTypeMap {
  START = 'start',
  END = 'end',
}

export type RangeDate = [SingleDate?, SingleDate?];
export type SingleTime = string;
export type RangeTime = [string, string];
export interface IDisabledDateSimple<T = SingleDate> {
  min?: T;
  max?: T;
}
export interface ICommonProps<DateValue = SingleDate> {
  value: DateValue;
  onChange: (date: SingleDate | RangeDate) => void;
  defaultDate?: DateValue;
  valueType?: IValueType;
  format?: string;
  disabled?: boolean;
  canClear?: boolean;
  openPanel?: boolean;
  width?: string | number;
  className?: string;
}
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
interface ITriggerCommonProps {
  text?: string | string[];
  format?: string;
  seperator?: string;
  width?: number | string;
  canClear?: boolean;
  disabled?: boolean;
  panelVisible: boolean;
  icon?: IconType;
  onClearInput: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface IShowTimeOption<T> {
  format?: string;
  defaultTime?: T;
}
export type IShowTime<T = string> = boolean | IShowTimeOption<T>;

/* ******************************** SinglePicker ******************************** */
export type IDisabledDate = (val: Date) => boolean | IDisabledDateSimple;
export interface ISingleProps extends ICommonProps<SingleDate> {
  placeholder?: string;
  disabledDate?: IDisabledDate;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface ISingleTriggerProps extends ITriggerCommonProps {
  name?: string;
  value: SingleDate;
  placeholder?: string;
  hiddenIcon?: boolean;
}

export interface ISinglePanelProps {
  selected: Date;
  defaultPanelDate: Date;
  hoverDate?: Date;
  hoverRangeDate?: [Date, Date];
  rangeDate?: [Date, Date];
  row?: number;
  col?: number;
  onSelected: (val: Date, status?: boolean) => void;
  disabledPanelDate?: (val: Date) => boolean;
  onChangePanel?: (type: IPickerType) => void;
}

export type ISingleDateBodyProps = Omit<ISinglePanelProps, 'onChangePanel'>;

/* **************************** CombinedRangePicker / RangePicker **************************** */
export interface IRangeProps extends ICommonProps<RangeDate> {
  placeholder?: string[];
  disabledDate?: IRangeDisabledDate;
  onOpen?: (type?: RangeType) => void;
  onClose?: (type?: RangeType) => void;
}
export type IRangeDisabledDate = (
  val: Date,
  type?: RangeType
) => boolean | IDisabledDateSimple;

export interface IRangeTriggerProps extends ITriggerCommonProps {
  value: RangeDate;
  placeholder?: string[];
  name?: string[];
}

export interface IRangePanelProps {
  selected: [Date, Date];
  defaultPanelDate: [Date, Date];
  hoverDate?: Date;
  hoverRangeDate?: [Date, Date];
  rangeDate?: [Date, Date];
  disabledStartDate: (val: Date) => boolean;
  disabledEndDate: (val: Date) => boolean;
  onSelected: (val: [Date, Date], status?: boolean) => void;
}

// **** TimePicker ****
interface ITimePickerBase<T> {
  selectedDate?: Date;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  defaultTime?: T;
  format?: string;
  disabled?: boolean;
  canClear?: boolean;
  openPanel?: boolean;
  width?: string | number;
  className?: string;
  name?: T;
}

export interface ITimePickerProps<T = SingleTime> extends ITimePickerBase<T> {
  value: T;
  onChange: (date: T) => void;
  placeholder?: T;
  hiddenIcon?: boolean;
  disabledTime?: IDisabledTime;
  onOpen?: () => void;
  onClose?: () => void;
}
export interface ITimePickerTriggerProps<T = SingleTime>
  extends Omit<ITimePickerProps<T>, 'value' | 'onChange'> {
  selected: T;
  onSelected: (value: T, status?: boolean) => void;
}

export interface ITimePanelProps<T = SingleTime> {
  selected: T;
  onSelected: (val: T, status?: boolean) => void;
  format?: string;
  defaultTime?: T;
  disabledTimesOption: IDisabledTimeOption;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  hideFooter?: boolean;
}
export interface ICombinedTimePanelProps
  extends Omit<ITimePanelProps<RangeTime>, 'disabledTimesOption'> {
  disabledTimesOptionStart: IDisabledTimeOption;
  disabledTimesOptionEnd: IDisabledTimeOption;
}

export interface IDisabledTimeOption {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
}
export type IDisabledTime = (
  date?: Date,
  type?: RangeType
) => IDisabledTimeOption;
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
