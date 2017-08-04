import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRangePicker from 'datetimepicker/DateRangePicker';
import cx from 'classnames';
import map from 'lodash/map';
import * as Helper from './helper';

export default class DateRangeQuickPicker extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array,
    format: PropTypes.string,
    chooseDays: PropTypes.number,
    preset: PropTypes.array,
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ]),
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ])
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    value: [],
    format: 'YYYY-MM-DD',
    preset: [
      {
        text: '最近7天',
        value: 7
      },
      {
        text: '最近30天',
        value: 30
      }
    ],
    min: '',
    max: ''
  };

  handleTimeChange = value => {
    const { onChange } = this.props;
    onChange(value, 0);
  };

  handleChooseDays = num => {
    const { format, onChange } = this.props;
    const value = Helper.calculateTime(format, num);
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
          type="split"
          value={value}
          onChange={this.handleTimeChange}
          format={format}
          showTime={!showTime}
          {...pickerProps}
        />
        {map(preset, (item, index) => {
          return (
            <span
              key={index}
              className={cx(`${prefix}-date-range-picker__btn`, {
                active: chooseDays === item.value
              })}
              onClick={this.handleChooseDays.bind(this, item.value)}
            >
              {item.text}
            </span>
          );
        })}
      </div>
    );
  }
}
