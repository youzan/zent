/**
 * TimeRangePicker
 *
 * @author hyczzhu
 */
import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import isDate from 'lodash/isDate';
import isArray from 'lodash/isArray';

import { I18nReceiver as Receiver } from 'i18n';

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

export default class TimeRangePicker extends PureComponent {
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
    showSecond: PropTypes.bool,
    disabledTime: PropTypes.func,
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
    showSecond: false,
    disabledTime: () => {},
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
      disabledTime,
      ...pickerProps
    } = this.props;
    let rangePicker;
    // 兼容老 api ，支持传入字符串
    const defaultValueArr = compatibleInterface(defaultValue);

    rangePicker = (
      <div className={cx(className, 'range-picker2')}>
        <Receiver componentName="TimePicker">
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
              disabledTime={() => disabledTime(START)}
            />
          )}
        </Receiver>

        <Receiver componentName="TimePicker">
          {i18n => <span className="picker-seperator">{i18n.to}</span>}
        </Receiver>

        <Receiver componentName="TimePicker">
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
              disabledTime={() => disabledTime(END)}
            />
          )}
        </Receiver>
      </div>
    );

    return rangePicker;
  }

  render() {
    const { prefix, className } = this.props;
    const prefixCls = cx(
      `${prefix}-datetime-picker`,
      `${prefix}-timerange-picker`,
      className
    );

    return <div className={prefixCls}>{this.renderPicker()}</div>;
  }
}
