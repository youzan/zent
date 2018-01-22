import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import isDate from 'lodash/isDate';
import isArray from 'lodash/isArray';

import { I18nReceiver as Receiver } from 'i18n';
import { TimePicker as I18nDefault } from 'i18n/default';

import { TIME_BEGIN, commonProps, commonPropTypes, noop } from './constants';
import DatePicker from './DatePicker';

// type
const START = 'start';
const END = 'end';

function compatibleInterface(prop) {
  if (!prop) return [];
  if (isArray(prop)) return prop;
  return isString(prop) || isDate(prop) ? [prop, prop] : prop;
}

class DateRangePicker extends (PureComponent || Component) {
  static propTypes = {
    ...commonPropTypes,
    showTime: PropTypes.bool,
    placeholder: PropTypes.array,
    defaultTime: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    ),
    valueType: PropTypes.oneOf(['string', 'number', 'date'])
  };

  static defaultProps = {
    ...commonProps,
    disabledDate: noop,
    placeholder: ['', ''],
    format: 'YYYY-MM-DD',
    value: [],
    openPanel: [],
    defaultTime: [TIME_BEGIN, TIME_BEGIN]
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
      className,
      defaultTime,
      defaultValue,
      disabledDate,
      onChange,
      onClick,
      onClose,
      onOpen,
      openPanel,
      placeholder,
      value,
      ...pickerProps
    } = this.props;
    let rangePicker;
    // 兼容老 api ，支持传入字符串
    const timeArr = compatibleInterface(defaultTime);
    const defaultValueArr = compatibleInterface(defaultValue);

    rangePicker = (
      <div className={cx(className, 'range-picker2')}>
        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <DatePicker
              {...pickerProps}
              openPanel={openPanel[0]}
              placeholder={placeholder[0] || i18n.start}
              max={value[1] || pickerProps.max}
              defaultValue={defaultValueArr[0]}
              defaultTime={timeArr[0]}
              value={value[0]}
              onClick={val => onClick && onClick(val, START)}
              onOpen={() => onOpen && onOpen(START)}
              onClose={() => onClose && onClose(START)}
              onChange={this.onChange(START)}
              disabledDate={val => disabledDate(val, START)}
            />
          )}
        </Receiver>

        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => <span className="picker-seperator">{i18n.to}</span>}
        </Receiver>

        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <DatePicker
              {...pickerProps}
              openPanel={openPanel[1]}
              placeholder={placeholder[1] || i18n.end}
              min={value[0] || pickerProps.min}
              defaultValue={defaultValueArr[1]}
              defaultTime={timeArr[1]}
              value={value[1]}
              onClick={val => onClick && onClick(val, END)}
              onOpen={() => onOpen && onOpen(END)}
              onClose={() => onClose && onClose(END)}
              onChange={this.onChange(END)}
              disabledDate={val => disabledDate(val, END)}
            />
          )}
        </Receiver>
      </div>
    );

    return rangePicker;
  }

  render() {
    const { prefix, className } = this.props;
    const prefixCls = `${prefix}-datetime-picker ${className}`;

    return <div className={prefixCls}>{this.renderPicker()}</div>;
  }
}

export default DateRangePicker;
