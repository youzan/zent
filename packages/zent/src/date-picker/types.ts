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
  onChange: (date: DateValue | [DateValue, DateValue]) => any;
  valueType?: IValueType;
  format?: string;
  defaultPanelValue?: DateValue;
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
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
}

export type IPickerType = 'date' | 'week' | 'month' | 'quarter' | 'year';

// **** DatePicker ****
export interface ISingleTriggerProps {
  value: SingleDate;
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
  onSelected: (val: Date, status?: boolean) => void;
  disabledPanelDate?: (val: Date) => boolean;
  onChangePanel?: (type: IPickerType) => void;
}

// **** CombinedPicker ****
export interface IRangeTriggerProps {
  value: SingleDate;
  seperator: string;
  placeholder: string[];
  onClearInput: (evt: any) => any;
}

export interface ICombinedDatePanelProps {
  selected: [Date, Date];
  defaultPanelDate: [Date, Date];
  defaultPanelTimes?: [string, string];
  onSelected: (val: [Date, Date], status?: boolean) => void;
  disabledPanelDate: Array<(val: Date) => boolean>;
  hoverDate?: Date;
  hoverRangeDate?: [Date, Date];
  rangeDate?: [Date, Date];
}

// **** TimePicker ****
export interface ITimePickerProps
  extends Omit<
    IDatePickerCommonProps<string>,
    'format' | 'valueType' | 'disabledDate'
  > {
  placeholder?: string;
  hiddenIcon?: boolean;
  autoOnChange?: boolean;
  disabledTimes?: IDisabledTimes;
}
export interface ITimePanelProps extends IDisabledTimes {
  selected: string;
  defaultPanelDate: string;
  onSelected: (val: string, status?: boolean) => void;
}
