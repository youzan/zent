import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import Popover from 'popover';
import PropTypes from 'prop-types';

import DatePicker from './DatePicker';
import { formatDate, maybeParseDate, dayStart, setTime } from './utils/date';
import { timeFnMap, noop } from './constants/';

let retType = 'string';

const isValidValue = val => {
  if (!isArray(val)) return false;
  const ret = val.filter(item => !!item);
  return ret.length === 2;
};

const getDateTime = (date, time) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
};

class DateRangePicker2 extends (PureComponent || Component) {
  static PropTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    placeholder: PropTypes.arrayOf(PropTypes.string),
    confirmText: PropTypes.string,
    valueType: PropTypes.oneOf(['date', 'number', 'string']),
    format: PropTypes.string,
    defaultTime: PropTypes.string,
    showTime: PropTypes.bool,
    disabledDate: PropTypes.arrayOf(PropTypes.func),
    onChange: PropTypes.arrayOf(PropTypes.func),
    onClick: PropTypes.arrayOf(PropTypes.func),
    onOpen: PropTypes.arrayOf(PropTypes.func),
    onClose: PropTypes.arrayOf(PropTypes.func)
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
    placeholder: ['开始日期', '结束日期'],
    confirmText: '确定',
    errorText: '请选择起止时间',
    format: 'YYYY-MM-DD',
    showTime: false,
    value: [],
    onClose: [],
    onOpen: [],
    openPanel: [],
    onChange: [],
    disabledDate: []

  };

  renderPicker() {
    const props = this.props;
    const { value, placeholder, className, onClose, onOpen, openPanel, onChange, disabledDate, ...pickerProps } = props;
    let rangePicker;

    const pickerCls = classNames('range-picker2');

    rangePicker = (
      <div className={pickerCls}>
        <DatePicker
          placeholder={placeholder[0]}
          value={value[0]}
          onChange={onChange[0]}
          onOpen={onOpen[0]}
          onClose={onClose[0]}
          openPanel={openPanel[0]}
          disabledDate={disabledDate[0]}
          {...pickerProps}
        />
        <span>至</span>
        <DatePicker
          placeholder={placeholder[1]}
          value={value[1]}
          onChange={onChange[1]}
          onOpen={onOpen[1]}
          onClose={onClose[1]}
          openPanel={openPanel[1]}
          disabledDate={disabledDate[1]}
          {...pickerProps}
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

export default DateRangePicker2;
