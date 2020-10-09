import { IconType } from '../icon';
import { PartialRequired } from '../utils/types';

export type SingleDate = string | number | Date;
export type RangeDate = [SingleDate | null, SingleDate | null];
export type SingleTime = string;
export type RangeTime = [string, string];

export type DateTuple = [Date, Date];
export type DateNullTuple = [Date | null, Date | null];
export type StringTuple = [string, string];

export type IValueType = 'date' | 'number' | 'string';
export type RangeType = 'start' | 'end';
export type IPickerType = 'date' | 'week' | 'month' | 'quarter' | 'year';
export enum RangeTypeMap {
  START = 'start',
  END = 'end',
}

export interface IDisabledDateSimple<T = SingleDate> {
  min?: T;
  max?: T;
}
export type IDisabledDateFunc = (date: Date) => boolean;
export type IRangeDisabledDateFunc = (date?: Date, type?: RangeType) => boolean;
interface ICommonProps<DateValue = SingleDate> {
  value: DateValue;
  onChange: (date: SingleDate | RangeDate | null) => void;
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
  text?: string | StringTuple;
  format: string;
  seperator?: string;
  width?: number | string;
  canClear?: boolean;
  disabled?: boolean;
  panelVisible: boolean;
  icon?: IconType;
  onClearInput: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface IShowTimeOption<T>
  extends Omit<ITimePickerBase<T>, 'className' | 'selectedDate'> {}

export type IShowTime<T = string> = boolean | IShowTimeOption<T>;
export type IShowTimeOptionWithDefault = PartialRequired<
  IShowTimeOption<string>,
  'format' | 'defaultTime'
>;
/* ******************************** SinglePicker ******************************** */
export type IDisabledDate = IDisabledDateFunc | IDisabledDateSimple;
export interface ISingleProps extends ICommonProps<SingleDate> {
  placeholder?: string;
  disabledDate?: IDisabledDate;
  onOpen?: () => void;
  onClose?: () => void;
  name?: string;
}
// 季度、周组件
export interface ISingleSepcialProps
  extends Omit<ISingleProps, 'value' | 'defaultDate'> {
  value: [SingleDate, SingleDate];
  defaultDate?: [SingleDate, SingleDate];
}

export type ISinglePropsWithDefault = PartialRequired<
  ISingleProps,
  'format' | 'valueType' | 'placeholder' | 'disabledDate'
>;
export interface ISingleTriggerProps extends ITriggerCommonProps {
  name?: string;
  value: SingleDate | null;
  placeholder: string;
  hiddenIcon?: boolean;
}

export interface ISinglePanelProps {
  selected: Date | null;
  defaultPanelDate: Date;
  hoverDate?: Date;
  hoverRangeDate?: DateTuple | null;
  rangeDate?: DateTuple | null;
  row?: number;
  col?: number;
  onSelected: (val: Date, status?: boolean) => void;
  disabledPanelDate: (val: Date) => boolean;
  onChangePanel?: (type: IPickerType) => void;
}

export type ISingleDateBodyProps = Omit<ISinglePanelProps, 'onChangePanel'>;

/* **************************** CombinedRangePicker / RangePicker **************************** */
export interface IRangeProps extends ICommonProps<RangeDate> {
  placeholder?: [string, string];
  disabledDate?: IRangeDisabledDateFunc | IDisabledDateSimple;
  onOpen?: (type?: RangeType) => void;
  onClose?: (type?: RangeType) => void;
  name?: [string, string];
}
export type IRangePropsWithDefault = PartialRequired<
  IRangeProps,
  'format' | 'valueType' | 'placeholder' | 'disabledDate'
>;

export interface IRangeTriggerProps extends ITriggerCommonProps {
  value: RangeDate;
  placeholder: StringTuple;
  name?: StringTuple;
}

export interface IRangePanelProps {
  selected: DateNullTuple;
  defaultPanelDate: DateTuple;
  hoverDate?: Date;
  hoverRangeDate?: DateTuple | null;
  rangeDate?: DateTuple | null;
  disabledStartDate: (date: Date) => boolean;
  disabledEndDate: (date: Date) => boolean;
  onSelected: (val: DateNullTuple, status?: boolean) => void;
}

// **** TimePicker ****
interface ITimePickerBase<T> {
  selectedDate?: Date | null;
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
}

interface ITimePickerProps<T = SingleTime> extends ITimePickerBase<T> {
  value: T;
  onChange: (date: T) => void;
  hiddenIcon?: boolean;
  autoComplete?: boolean;
  disabledTime?: IDisabledTime;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface ISingleTimePickerProps extends ITimePickerProps<SingleTime> {
  name?: string;
  placeholder?: string;
}
export type ISingleTimePickerPropsWithDefault = PartialRequired<
  ISingleTimePickerProps,
  'format' | 'placeholder'
>;
export interface ICombinedTimeRangePickerProps
  extends ITimePickerProps<RangeTime> {
  name?: [string, string];
  placeholder?: [string, string];
}
export type ICombinedTimeRangePickerPropsWithDefault = PartialRequired<
  ICombinedTimeRangePickerProps,
  'format' | 'placeholder'
>;
export interface ITimeRangePickerProps extends ICombinedTimeRangePickerProps {
  onOpen?: (type?: RangeType) => void;
  onClose?: (type?: RangeType) => void;
}
export type ITimeRangePickerPropsWithDefault = PartialRequired<
  ITimeRangePickerProps,
  'format' | 'placeholder'
>;

export interface ITimePickerTriggerProps<T = SingleTime>
  extends Omit<ITimePickerProps<T>, 'value' | 'onChange'> {
  selected: T;
  onSelected: (value: T, status?: boolean) => void;
}

export interface ITimePanelProps<T = SingleTime> {
  selected: T;
  onSelected: (val: T, status?: boolean) => void;
  format: string;
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
  date?: Date | null,
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
