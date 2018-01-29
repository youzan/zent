import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import isArray from 'lodash/isArray';
import getQuarter from 'date-fns/get_quarter';

import Input from 'input';
import Popover from 'popover';
import getWidth from 'utils/getWidth';
import { I18nReceiver as Receiver } from 'i18n';
import { TimePicker as I18nDefault } from 'i18n/default';

import QuarterPanel from './quarter/QuarterPanel';
import { dayStart, dayEnd, formatDate, parseDate } from './utils';
import {
  noop,
  popPositionMap,
  commonProps,
  commonPropTypes
} from './constants';

const quarterMonthMap = {
  0: 0,
  1: 3,
  2: 6,
  3: 9
};

function getQuarterLastDay(quarter, year) {
  const quarterLastDayMap = {
    0: [3, 0],
    1: [6, 0],
    2: [9, 0],
    3: [12, 0]
  };

  return new Date(year, ...quarterLastDayMap[quarter]);
}

function extractStateFromProps(props) {
  let showPlaceholder;
  let selected;
  let actived;
  const { format, value, defaultValue } = props;
  const val = isArray(value) ? value[0] : value;

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
    showPlaceholder
  };
}

class QuarterPicker extends (PureComponent || Component) {
  static propTypes = {
    ...commonPropTypes
  };

  static defaultProps = {
    ...commonProps,
    placeholder: '',
    format: 'YYYY-MM-DD'
  };

  retType = 'string';

  constructor(props) {
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

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  getReturnValue = date => {
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
      actived: val
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
    const ret = [dayStart(begin), dayEnd(end)];

    this.setState({
      value: quarter,
      selected: begin,
      actived: begin,
      openPanel: false,
      showPlaceholder: false
    });

    onChange(ret.map(this.getReturnValue));
  };

  onClearInput = evt => {
    evt.stopPropagation();
    const { canClear, onChange } = this.props;
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
    const ret = [begin, end];

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
      openPanel
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
        width
      },
      state: { openPanel, selected, showPlaceholder, value }
    } = this;
    const wrapperCls = cx(`${prefix}-datetime-picker`, className);
    const inputCls = cx({
      'picker-input': true,
      'picker-input--filled': !showPlaceholder,
      'picker-input--disabled': disabled
    });
    const widthStyle = getWidth(width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => {
            let inputVal;
            if (selected) {
              inputVal =
                i18n.mark === 'zh-CN'
                  ? `${selected.getFullYear()}年${i18n.panel.quarterNames[
                      value
                    ]}`
                  : `${i18n.panel.quarterNames[
                      value
                    ]} of ${selected.getFullYear()}`;
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
                      value={showPlaceholder ? placeholderText : inputVal}
                      onChange={noop}
                      disabled={disabled}
                    />
                    <span className="zenticon zenticon-calendar-o" />
                    <span
                      onClick={this.onClearInput}
                      className="zenticon zenticon-close-circle"
                    />
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
