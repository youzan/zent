/**
 * TimeRangePicker
 *
 * @author hyczzhu
 */
import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
import isString from 'lodash-es/isString';
import isDate from 'lodash-es/isDate';

import { I18nReceiver as Receiver } from '../i18n';

import { commonProps, noop } from './constants';
import TimePicker from './TimePicker';
import { DatePickers } from './common/types';

// type
const START = 'start';
const END = 'end';

function compatibleInterface(prop) {
  if (!prop) return [];
  if (Array.isArray(prop)) return prop;
  return isString(prop) || isDate(prop) ? [prop, prop] : prop;
}

export interface ITimeRangePickerProps
  extends Omit<
    DatePickers.ICommonProps<DatePickers.RangeValue>,
    'placeholder'
  > {
  placeholder: [string?, string?];
  isFooterVisble?: boolean;
  showSecond?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabledTime?: (type: DatePickers.RangeType) => DatePickers.IDisabledTime;
}

export class TimeRangePicker extends PureComponent<ITimeRangePickerProps> {
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
      onChange && onChange(ret as any);
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
      openPanel,
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
              openPanel={openPanel[0]}
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
              openPanel={openPanel[1]}
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

export default TimeRangePicker;
