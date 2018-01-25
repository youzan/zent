/**
 * TimeRangePicker
 *
 * @author hyczzhu
 */
import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import isDate from 'lodash/isDate';
import isArray from 'lodash/isArray';

import { I18nReceiver as Receiver } from 'i18n';
import { TimePicker as I18nDefault } from 'i18n/default';

import { commonProps, commonPropTypes, noop } from './constants';
import TimePicker from './TimePicker';

// type
const START = 'start';
const END = 'end';

function compatibleInterface(prop) {
  if (!prop) return [];
  if (isArray(prop)) return prop;
  return isString(prop) || isDate(prop) ? [prop, prop] : prop;
}

export default class TimeRangePicker extends (PureComponent || Component) {
  static propTypes = {
    ...commonPropTypes,
    placeholder: PropTypes.array,
    valueType: PropTypes.oneOf(['string', 'number', 'date']),
    value: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    ),
    hourStep: PropTypes.number,
    minuteStep: PropTypes.number,
    secondStep: PropTypes.number,
    showSecond: PropTypes.bool
  };

  static defaultProps = {
    ...commonProps,
    format: 'HH:mm:ss',
    isFooterVisble: true,
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
    disabledDate: noop,
    placeholder: ['', ''],
    value: [],
    openPanel: [],
    showSecond: false
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
      defaultValue,
      onClose,
      onOpen,
      placeholder,
      value,
      ...pickerProps
    } = this.props;
    let rangePicker;
    // 兼容老 api ，支持传入字符串
    const defaultValueArr = compatibleInterface(defaultValue);

    rangePicker = (
      <div className={cx(className, 'range-picker2')}>
        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <TimePicker
              {...pickerProps}
              placeholder={placeholder[0] || i18n.startTime}
              max={value[1] || pickerProps.max}
              defaultValue={defaultValueArr[0]}
              value={value[0]}
              onOpen={() => onOpen && onOpen(START)}
              onClose={() => onClose && onClose(START)}
              onChange={this.onChange(START)}
            />
          )}
        </Receiver>

        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => <span className="picker-seperator">{i18n.to}</span>}
        </Receiver>

        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <TimePicker
              {...pickerProps}
              placeholder={placeholder[1] || i18n.endTime}
              min={value[0] || pickerProps.min}
              defaultValue={defaultValueArr[1]}
              value={value[1]}
              onOpen={() => onOpen && onOpen(END)}
              onClose={() => onClose && onClose(END)}
              onChange={this.onChange(END)}
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
