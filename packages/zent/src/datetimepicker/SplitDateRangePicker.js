import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';

import { I18nReciever as Reciever } from 'i18n';
import { TimePicker as I18nDefault } from 'i18n/default';

import { commonProps, commonPropTypes } from './constants';
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
    placeholder: ['', ''],
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
      className,
      defaultTime,
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
    const timeArr = isString(defaultTime)
      ? [defaultTime, defaultTime]
      : defaultTime;
    const pickerCls = classNames('range-picker2');

    rangePicker = (
      <div className={pickerCls}>
        <Reciever componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <DatePicker
              {...pickerProps}
              openPanel={openPanel[0]}
              placeholder={placeholder[0] || i18n.start}
              max={value[1] || pickerProps.max}
              defaultTime={timeArr[0]}
              value={value[0]}
              onClick={val => onClick && onClick(val, START)}
              onOpen={() => onOpen && onOpen(START)}
              onClose={() => onClose && onClose(START)}
              onChange={this.onChange(START)}
              disabledDate={val => disabledDate(val, START)}
            />
          )}
        </Reciever>

        <Reciever componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => <span className="picker-seperator">{i18n.to}</span>}
        </Reciever>

        <Reciever componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <DatePicker
              {...pickerProps}
              openPanel={openPanel[1]}
              placeholder={placeholder[1] || i18n.end}
              min={value[0] || pickerProps.min}
              defaultTime={timeArr[1]}
              value={value[1]}
              onClick={val => onClick && onClick(val, END)}
              onOpen={() => onOpen && onOpen(END)}
              onClose={() => onClose && onClose(END)}
              onChange={this.onChange(END)}
              disabledDate={val => disabledDate(val, END)}
            />
          )}
        </Reciever>
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

export default SplitDateRangePicker;
