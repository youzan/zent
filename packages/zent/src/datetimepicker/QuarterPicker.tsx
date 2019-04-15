import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
const getQuarter = require('date-fns/get_quarter');

import Input from '../input';
import Popover from '../popover';
import getWidth from '../utils/getWidth';
import { I18nReceiver as Receiver } from '../i18n';

import QuarterPanel from './quarter/QuarterPanel';
import { dayStart, dayEnd, formatDate, parseDate } from './utils';
import { noop, popPositionMap, commonProps } from './constants';
import { DatePickers } from './common/types';

const quarterMonthMap = {
  0: 0,
  1: 3,
  2: 6,
  3: 9,
};

const QUARTER_LAST_YEAR_MAP = {
  0: [3, 0],
  1: [6, 0],
  2: [9, 0],
  3: [12, 0],
};

function getQuarterLastDay(
  quarter: keyof typeof QUARTER_LAST_YEAR_MAP,
  year: number
) {
  return new (Date as any)(year, ...QUARTER_LAST_YEAR_MAP[quarter]);
}

export interface IQuarterPickerProps
  extends Omit<
    DatePickers.ICommonProps<DatePickers.RangeValue>,
    'disabledDate'
  > {
  disabledDate?: (
    val: [DatePickers.Value, DatePickers.Value],
    type?: DatePickers.RangeType
  ) => boolean;
  onBeforeClear?: () => boolean;
}

function extractStateFromProps(props: IQuarterPickerProps) {
  let showPlaceholder;
  let selected;
  let actived;
  const { format, value, defaultValue } = props;
  const val = Array.isArray(value) ? value[0] : value;

  if (val) {
    const tmp = parseDate(val, format);
    if (tmp) {
      showPlaceholder = false;
      selected = actived = tmp;
    } else {
      console.warn("date and format don't match."); // eslint-disable-line
      showPlaceholder = true;
      actived = dayStart();
    }
  } else {
    showPlaceholder = true;
    if (defaultValue) {
      actived = parseDate(defaultValue, format);
    } else {
      actived = dayStart();
    }
  }
  let quarter;
  if (selected) {
    quarter = getQuarter(selected) - 1;
  }

  return {
    value: quarter,
    actived,
    selected,
    openPanel: false,
    showPlaceholder,
    prevProps: props,
  };
}

export class QuarterPicker extends PureComponent<IQuarterPickerProps, any> {
  static defaultProps = {
    ...commonProps,
    placeholder: '',
    format: 'YYYY-MM-DD',
  };

  static getDerivedStateFromProps(props: IQuarterPickerProps, state: any) {
    if (props !== state.prevProps) {
      return extractStateFromProps(props);
    }
    return null;
  }

  retType = 'string';
  picker: HTMLDivElement | null = null;

  constructor(props: IQuarterPickerProps) {
    super(props);
    this.state = extractStateFromProps(props);

    const { value, valueType } = props;
    if (valueType) {
      this.retType = valueType.toLowerCase();
    } else if (value) {
      if (typeof value === 'number') this.retType = 'number';
      if (value instanceof Date) this.retType = 'date';
    }
  }

  getReturnValue = (date: Date) => {
    const { format } = this.props;
    if (this.retType === 'number') {
      return date.getTime();
    }

    if (this.retType === 'date') {
      return date;
    }

    return formatDate(date, format);
  };

  onChangeQuarter = val => {
    this.setState({
      actived: val,
    });
  };

  onSelectQuarter = quarter => {
    const { actived } = this.state;
    const { onChange } = this.props;
    const year = actived.getFullYear();
    const month = quarterMonthMap[quarter];

    if (this.isDisabled(quarter)) return;

    const begin = new Date(year, month, 1);
    const end = getQuarterLastDay(quarter, year);
    const ret: [DatePickers.Value, DatePickers.Value] = [
      dayStart(begin),
      dayEnd(end),
    ];

    this.setState({
      value: quarter,
      selected: begin,
      actived: begin,
      openPanel: false,
      showPlaceholder: false,
    });

    onChange(ret.map(this.getReturnValue) as [
      DatePickers.Value,
      DatePickers.Value
    ]);
  };

  onClearInput = evt => {
    evt.stopPropagation();
    const { onChange, onBeforeClear, canClear } = this.props;
    if (onBeforeClear && !onBeforeClear()) return; // 用户可以通过这个函数返回 false 来阻止清空

    if (!canClear) return;

    onChange([]);
  };

  isDisabled = quarter => {
    const { disabledDate, min, max, format } = this.props;
    const { actived } = this.state;
    const year = actived.getFullYear();
    const month = quarterMonthMap[quarter];
    const begin = dayStart(new Date(year, month, 1));
    const end = dayEnd(getQuarterLastDay(quarter, year));
    const ret: [DatePickers.Value, DatePickers.Value] = [begin, end];

    if (disabledDate) return disabledDate(ret);
    if (min && end < parseDate(min, format)) return true;
    if (max && begin > parseDate(max, format)) return true;

    return false;
  };

  renderPicker(i18n) {
    const { openPanel, actived, selected } = this.state;
    let quarterPicker;
    if (openPanel) {
      quarterPicker = (
        <div className="quarter-picker" ref={ref => (this.picker = ref)}>
          <QuarterPanel
            actived={actived}
            selected={selected}
            onChange={this.onChangeQuarter}
            onSelect={this.onSelectQuarter}
            disabledDate={this.isDisabled}
            i18n={i18n}
          />
        </div>
      );
    }

    return quarterPicker;
  }

  togglePicker = () => {
    const { disabled } = this.props;
    const openPanel = !this.state.openPanel;

    if (disabled) return;

    this.setState({
      openPanel,
    });
  };

  render() {
    const {
      props: {
        className,
        disabled,
        name,
        placeholder,
        popPosition,
        prefix,
        width,
        canClear,
        autoComplete,
      },
      state: { openPanel, selected, showPlaceholder, value },
    } = this;
    const wrapperCls = cx(
      `${prefix}-datetime-picker`,
      `${prefix}-quarter-picker`,
      className
    );
    const inputCls = cx({
      'picker-input': true,
      'picker-input--show-clear-icon': canClear && !showPlaceholder,
      'picker-input--disabled': disabled,
    });
    const widthStyle = getWidth(width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Receiver componentName="TimePicker">
          {(i18n: any) => {
            let inputVal;
            if (selected) {
              inputVal =
                i18n.mark === 'zh-CN'
                  ? `${selected.getFullYear()}年${
                      i18n.panel.quarterNames[value]
                    }`
                  : `${
                      i18n.panel.quarterNames[value]
                    } of ${selected.getFullYear()}`;
            }
            const placeholderText = placeholder || i18n.quarter;

            return (
              <Popover
                cushion={5}
                visible={openPanel}
                onVisibleChange={this.togglePicker}
                className={`${prefix}-datetime-picker-popover ${className}-popover`}
                position={popPositionMap[popPosition.toLowerCase()]}
              >
                <Popover.Trigger.Click>
                  <div style={widthStyle} className={inputCls}>
                    <Input
                      name={name}
                      placeholder={placeholderText}
                      value={inputVal}
                      onChange={noop}
                      disabled={disabled}
                      autoComplete={autoComplete}
                    />
                    <span className="zenticon zenticon-calendar-o" />
                    {canClear && (
                      <span
                        onClick={this.onClearInput}
                        className="zenticon zenticon-close-circle"
                      />
                    )}
                  </div>
                </Popover.Trigger.Click>
                <Popover.Content>{this.renderPicker(i18n)}</Popover.Content>
              </Popover>
            );
          }}
        </Receiver>
      </div>
    );
  }
}

export default QuarterPicker;
