/// <reference types="react" />

declare module 'zent/lib/date-range-quick-picker' {
  type DateRangeQuickPickerValue = number | string;

  interface IDateRangeQuickPickerPreset {
    text: string;
    value: number;
  }

  interface IDateRangeQuickPickerProps {
    prefix?: string;
    className?: string;
    onChange: (
      value: [DateRangeQuickPickerValue, DateRangeQuickPickerValue],
      choosePresetValue?: number
    ) => void;
    value?: Array<DateRangeQuickPickerValue>;
    valueType?: 'string' | 'number';
    format?: string;
    chooseDays?: number;
    preset?: Array<IDateRangeQuickPickerPreset>;
    min?: string | number | Date;
    max?: string | number | Date;
  }

  export default class DateRangeQuickPicker extends React.Component<
    IDateRangeQuickPickerProps,
    any
  > {}
}
