import { Component } from 'react';
import cx from 'classnames';

import formatDate from '../utils/date/formatDate';
import { getValidDate } from '../utils/date/helpers';
import isEqual from '../utils/isEqual';
import { DateRangePicker, SingleDate, RangeDate } from '../date-picker';
import { I18nReceiver as Receiver } from '../i18n';

const ONE_DAY = 1000 * 60 * 60 * 24;

export type DateRangeQuickPickerValueType = 'string' | 'number' | 'date';

export type DateRangeQuickPickerPresetValue = number | RangeDate;

export type DateRangeQuickPickerChangeCallback = (
  value: RangeDate,
  choosePresetValue?: DateRangeQuickPickerPresetValue
) => void;

export interface IDateRangeQuickPickerPreset {
  text: string;
  value: DateRangeQuickPickerPresetValue;
}

export interface IDateRangeQuickPickerProps {
  onChange: DateRangeQuickPickerChangeCallback;
  value: RangeDate;
  valueType?: DateRangeQuickPickerValueType;
  format: string;
  /**
   * @deprecated use chosenDays
   */
  chooseDays?: DateRangeQuickPickerPresetValue;
  chosenDays?: DateRangeQuickPickerPresetValue;
  preset?: IDateRangeQuickPickerPreset[];
  defaultSelectedPresetIndex?: number;
  min?: SingleDate;
  max?: SingleDate;
  className?: string;
}

export class DateRangeQuickPicker extends Component<IDateRangeQuickPickerProps> {
  static defaultProps = {
    className: '',
    value: [],
    valueType: 'string',
    format: 'YYYY-MM-DD',
    preset: [
      {
        value: 7,
      },
      {
        value: 30,
      },
    ],
    min: '',
    max: '',
  };

  constructor(props: IDateRangeQuickPickerProps) {
    super(props);

    const { value, defaultSelectedPresetIndex, preset } = props;

    // Set default value to preset[defaultSelectedPresetIndex]
    if (
      typeof defaultSelectedPresetIndex === 'number' &&
      (!value || (Array.isArray(value) && !value.length))
    ) {
      const val = preset[defaultSelectedPresetIndex]?.value;
      if (val !== undefined) {
        this.handleChosenDays(val);
      }
    }
  }

  handleTimeChange = (value: RangeDate) => {
    const { onChange } = this.props;
    onChange(value, NaN);
  };

  handleChosenDays = (num: DateRangeQuickPickerPresetValue) => {
    const { format, onChange, valueType } = this.props;
    const value = calculateTime(format, num, valueType);
    onChange(value, num);
  };

  render() {
    const {
      className,
      format,
      value,
      chooseDays,
      chosenDays,
      preset,
      min,
      max,
      ...pickerProps
    } = this.props;
    const showTime = format === 'YYYY-MM-DD';
    const selectedDays = chosenDays ?? chooseDays;

    return (
      <div className={cx('zent-date-range-quick-picker', className)}>
        <DateRangePicker
          value={value}
          onChange={this.handleTimeChange}
          format={format}
          showTime={!showTime}
          disabledDate={{ min, max }}
          {...pickerProps}
        />
        <div className={'zent-date-range-quick-picker__filter'}>
          {preset.map((item, index) => (
            <Receiver key={index} componentName="RangePicker">
              {i18n => (
                <span
                  key={index}
                  className={cx('zent-date-range-quick-picker__btn', {
                    active: isEqual(selectedDays, item.value),
                  })}
                  onClick={this.handleChosenDays.bind(this, item.value)}
                >
                  {item.text ||
                    (typeof item.value === 'number' ? i18n[item.value] : 'N/A')}
                </span>
              )}
            </Receiver>
          ))}
        </div>
      </div>
    );
  }
}

function calculateTime(
  format: string,
  chosenItem: DateRangeQuickPickerPresetValue,
  valueType: DateRangeQuickPickerValueType
): RangeDate {
  let startTime: SingleDate;
  let endTime: SingleDate;

  const today = getToday();

  if (Array.isArray(chosenItem)) {
    [startTime, endTime] = chosenItem;
  } else {
    if (chosenItem > 1) {
      startTime = today - (chosenItem - 1) * ONE_DAY;
    } else {
      startTime = today - chosenItem * ONE_DAY;
    }

    if (chosenItem === 1) {
      endTime = today - 1000;
    } else {
      endTime = Date.now();
    }
  }

  const startTimeDate = getValidDate(startTime);
  const endTimeDate = getValidDate(endTime);

  if (valueType === 'number') {
    return [startTimeDate.getTime(), endTimeDate.getTime()];
  } else if (valueType === 'date') {
    return [startTimeDate, endTimeDate];
  }

  // valueType is string
  const startTimeStr = formatDate(startTimeDate, format);
  const endTimeStr = formatDate(endTimeDate, format);
  return [startTimeStr, endTimeStr];
}

function getToday() {
  const d = new Date();
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.getTime();
}

export default DateRangeQuickPicker;
