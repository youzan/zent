import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';

import { commonProps, commonPropTypes } from './constants/';
import DatePicker from './DatePicker';

// type
const START = 'start';
const END = 'end';

class SplitDateRangePicker extends (PureComponent || Component) {
  static propTypes = {
    ...commonPropTypes,
    showTime: PropTypes.bool,
    placeholder: PropTypes.array,
    defaultTime: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    ...commonProps,
    placeholder: ['开始日期', '结束日期'],
    format: 'YYYY-MM-DD',
    value: [],
    openPanel: [],
    defaultTime: ['00:00:00', '00:00:00']
  };

  onChange = type => {
    return val => {
      const { onChange, value } = this.props;
      const ret = value ? value.slice() : [];

      if (type === START) {
        ret.length === 2 ? ret.splice(0, 1, val) : ret.splice(0, 1, val, '');
      } else {
        ret.length === 0 ? ret.splice(1, 1, '', val) : ret.splice(1, 1, val);
      }
      onChange(ret);
    };
  };

  renderPicker() {
    const {
      value,
      placeholder,
      className,
      onClose,
      onOpen,
      onClick,
      openPanel,
      onChange,
      disabledDate,
      defaultTime,
      ...pickerProps
    } = this.props;
    let rangePicker;
    // 兼容老 api ，支持传入字符串
    const timeArr = isString(defaultTime)
      ? [defaultTime, defaultTime]
      : defaultTime;
    const pickerCls = classNames('range-picker2');

    rangePicker = (
      <div className={pickerCls}>
        <DatePicker
          {...pickerProps}
          openPanel={openPanel[0]}
          placeholder={placeholder[0]}
          max={value[1] || pickerProps.max}
          defaultTime={timeArr[0]}
          value={value[0]}
          onClick={val => onClick && onClick(val, START)}
          onOpen={() => onOpen && onOpen(START)}
          onClose={() => onClose && onClose(START)}
          onChange={this.onChange(START)}
          disabledDate={val => disabledDate(val, START)}
        />
        <span className="picker-seperator">至</span>
        <DatePicker
          {...pickerProps}
          openPanel={openPanel[1]}
          placeholder={placeholder[1]}
          min={value[0] || pickerProps.min}
          defaultTime={timeArr[1]}
          value={value[1]}
          onClick={val => onClick && onClick(val, END)}
          onOpen={() => onOpen && onOpen(END)}
          onClose={() => onClose && onClose(END)}
          onChange={this.onChange(END)}
          disabledDate={val => disabledDate(val, END)}
        />
      </div>
    );

    return rangePicker;
  }

  render() {
    const props = this.props;
    const prefixCls = `${props.prefix}-datetime-picker ${props.className}`;

    return <div className={prefixCls}>{this.renderPicker()}</div>;
  }
}

export default SplitDateRangePicker;
