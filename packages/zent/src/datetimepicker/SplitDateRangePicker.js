import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { commonProps, commonPropTypes } from './constants/';
import DatePicker from './DatePicker';

// type
const START = 'start';
const END = 'end';

class SplitDateRangePicker extends (PureComponent || Component) {
  static PropTypes = {
    ...commonPropTypes,
    showTime: PropTypes.bool,
    placeholder: PropTypes.array
  };

  static defaultProps = {
    ...commonProps,
    placeholder: ['开始日期', '结束日期'],
    format: 'YYYY-MM-DD',
    value: [],
    openPanel: []
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
    const props = this.props;

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
      ...pickerProps
    } = props;
    let rangePicker;

    const pickerCls = classNames('range-picker2');

    rangePicker = (
      <div className={pickerCls}>
        <DatePicker
          {...pickerProps}
          placeholder={placeholder[0]}
          value={props.value[0]}
          onClick={val => onClick && onClick(val, START)}
          onChange={this.onChange(START)}
          onOpen={() => onOpen && onOpen(START)}
          onClose={() => onClose && onClose(START)}
          openPanel={openPanel[0]}
          disabledDate={val => disabledDate(val, START)}
        />
        <span className="picker-seperator">至</span>
        <DatePicker
          {...pickerProps}
          placeholder={placeholder[1]}
          value={props.value[1]}
          onClick={val => onClick && onClick(val, END)}
          onChange={this.onChange(END)}
          onOpen={() => onOpen && onOpen(END)}
          onClose={() => onClose && onClose(END)}
          openPanel={openPanel[1]}
          disabledDate={val => disabledDate(val, END)}
        />
      </div>
    );

    return rangePicker;
  }

  render() {
    const props = this.props;
    const prefixCls = `${props.prefix}-datetime-picker ${props.className}`;

    return (
      <div className={prefixCls}>
        {this.renderPicker()}
      </div>
    );
  }
}

export default SplitDateRangePicker;
