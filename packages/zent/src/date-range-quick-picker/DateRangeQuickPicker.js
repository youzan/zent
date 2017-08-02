import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRangePicker2 from 'datetimepicker/DateRangePicker2';
import cx from 'classnames';
import * as Helper from './helper';

export default class DateRangeQuickPicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array,
    format: PropTypes.string,
    chooseDays: PropTypes.number,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    value: [],
    chooseDays: 0,
    format: 'YYYY-MM-DD'
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
    const { className, format, value, chooseDays, prefix } = this.props;
    const showTime = format === 'YYYY-MM-DD';

    return (
      <div className={cx(`${prefix}-date-range-picker`, className)}>
        <DateRangePicker2
          value={value}
          onChange={this.handleTimeChange}
          format={format}
          showTime={!showTime}
        />
        <span
          className={cx(`${prefix}-date-range-picker__btn`, {
            active: chooseDays === 7
          })}
          onClick={this.handleChooseDays.bind(this, 7)}
        >
          最近7天
        </span>
        <span
          className={cx(`${prefix}-date-range-picker__btn`, {
            active: chooseDays === 30
          })}
          onClick={this.handleChooseDays.bind(this, 30)}
        >
          最近30天
        </span>
      </div>
    );
  }
}
