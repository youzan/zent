import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import map from 'lodash-es/map';

import DateRangePicker from '../datetimepicker/DateRangePicker';
import { I18nReceiver as Receiver } from '../i18n';

import * as Helper from './helper';

export type DateRangeQuickPickerValue = number | string;

export interface IDateRangeQuickPickerPreset {
  text: string;
  value: number;
}

export interface IDateRangeQuickPickerProps {
  prefix?: string;
  className?: string;
  onChange: (
    value: [DateRangeQuickPickerValue, DateRangeQuickPickerValue],
    choosePresetValue?: number
  ) => void;
  value?: [DateRangeQuickPickerValue, DateRangeQuickPickerValue];
  valueType?: 'string' | 'number';
  format?: string;
  chooseDays?: number;
  preset?: Array<IDateRangeQuickPickerPreset>;
  min?: string | number | Date;
  max?: string | number | Date;
}

export class DateRangeQuickPicker extends Component<IDateRangeQuickPickerProps> {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array,
    valueType: PropTypes.oneOf(['date', 'number', 'string']),
    format: PropTypes.string,
    chooseDays: PropTypes.number,
    preset: PropTypes.array,
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
  };

  static defaultProps = {
    prefix: 'zent',
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

  handleTimeChange = value => {
    const { onChange } = this.props;
    onChange(value, 0);
  };

  handleChooseDays = num => {
    const { format, onChange, valueType } = this.props;
    const value = Helper.calculateTime(format, num, valueType);
    onChange(value, num);
  };

  render() {
    const {
      className,
      format,
      value,
      chooseDays,
      prefix,
      preset,
      ...pickerProps
    } = this.props;
    const showTime = format === 'YYYY-MM-DD';

    return (
      <div className={cx(`${prefix}-date-range-picker`, className)}>
        <DateRangePicker
          value={value}
          onChange={this.handleTimeChange}
          format={format}
          showTime={!showTime}
          {...pickerProps}
        />
        <div className={`${prefix}-date-range-picker__filter`}>
          {map(preset, (item, index) => (
            <Receiver key={index} componentName="RangePicker">
              {i18n => (
                <span
                  key={index}
                  className={cx(`${prefix}-date-range-picker__btn`, {
                    active: chooseDays === item.value,
                  })}
                  onClick={this.handleChooseDays.bind(this, item.value)}
                >
                  {item.text || i18n[item.value]}
                </span>
              )}
            </Receiver>
          ))}
        </div>
      </div>
    );
  }
}

export default DateRangeQuickPicker;
