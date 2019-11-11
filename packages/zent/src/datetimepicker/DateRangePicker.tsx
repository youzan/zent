import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';
import isString from 'lodash-es/isString';
import isDate from 'lodash-es/isDate';

import { I18nReceiver as Receiver } from '../i18n';

import { TIME_BEGIN, commonProps, noop } from './constants';
import DatePicker from './DatePicker';
import { DatePickers } from './common/types';

// type
const START = 'start';
const END = 'end';

function compatibleInterface(prop) {
  if (!prop) return [];
  if (Array.isArray(prop)) return prop;
  return isString(prop) || isDate(prop) ? [prop, prop] : prop;
}

export interface IDateRangePickerProps
  extends DatePickers.ICommonProps<DatePickers.RangeValue> {
  showTime?: boolean;
  disabledTime?: (type: DatePickers.RangeType) => DatePickers.IDisabledTime;
}

export class DateRangePicker extends PureComponent<IDateRangePickerProps> {
  static defaultProps = {
    ...commonProps,
    disabledDate: noop,
    placeholder: ['', ''],
    format: 'YYYY-MM-DD',
    value: [],
    openPanel: [],
    defaultTime: [TIME_BEGIN, TIME_BEGIN],
    disabledTime: () => undefined,
  };

  onChange = (type: DatePickers.RangeType) => {
    return val => {
      const { onChange, value } = this.props;
      const ret = value ? value.slice() : [];

      if (type === START) {
        ret.length === 2 ? ret.splice(0, 1, val) : ret.splice(0, 1, val, '');
      } else {
        ret.length === 0 ? ret.splice(1, 1, '', val) : ret.splice(1, 1, val);
      }
      onChange(ret as any);
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
      disabledTime,
      ...pickerProps
    } = this.props;
    let rangePicker;
    // 兼容老 api ，支持传入字符串
    const timeArr = compatibleInterface(defaultTime);
    const defaultValueArr = compatibleInterface(defaultValue);

    rangePicker = (
      <div className={cx(className, 'range-picker2')}>
        <Receiver componentName="TimePicker">
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
              disabledTime={() => disabledTime(START)}
            />
          )}
        </Receiver>

        <Receiver componentName="TimePicker">
          {i18n => <span className="picker-seperator">{i18n.to}</span>}
        </Receiver>

        <Receiver componentName="TimePicker">
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
      `${prefix}-daterange-picker`,
      className
    );

    return <div className={prefixCls}>{this.renderPicker()}</div>;
  }
}

export default DateRangePicker;
