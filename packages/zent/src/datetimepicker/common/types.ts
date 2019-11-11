export namespace DatePickers {
  export type Value = string | number | Date;

  export type RangeValue = [Value?, Value?];

  export type RangeType = 'start' | 'end';

  export interface ICommonProps<Val = Value> {
    prefix?: string;
    name?: string;
    className?: string;
    placeholder?: string;
    confirmText?: string;
    width?: string | number;
    format?: string;
    openPanel?: boolean;
    defaultTime?: string;
    // onChange 返回值类型, date | number | string， 默认 string
    valueType?: 'date' | 'number' | 'string';
    popPosition?: 'left' | 'right';
    // min 和 max 可以传入和 format 一致的字符串或者 Date 实例
    min?: Value;
    max?: Value;
    disabledDate?: (val: Value, type?: RangeType) => boolean;
    onClick?: (val: Value, type?: RangeType) => void;
    value: Val;
    defaultValue?: Val;
    onChange?: (val: Val) => void;
    onOpen?: (type?: RangeType) => void;
    onClose?: (type?: RangeType) => void;
    canClear?: boolean;
    disabled?: boolean;
    autoComplete?: string;
  }

  export interface IDisabledTime {
    disabledHour: (val: number) => boolean;
    disabledMinute: (val: number) => boolean;
    disabledSecond: (val: number) => boolean;
  }

  export interface IPanelCellValue {
    text: number;
    value: Date;
    title: string;
    isDisabled: boolean;
    className: string;
  }

  export interface ITimeCellValue {
    text: string;
    value: number;
    isDisabled: boolean;
    className: string;
  }
}
