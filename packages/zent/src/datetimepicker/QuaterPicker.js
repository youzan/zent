import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import parseDate from 'zan-utils/date/parseDate';

import Input from 'input';
import Popover from 'popover';
import getWidth from 'utils/getWidth';
import { I18nReciever as Reciever } from 'i18n';
import { TimePicker as I18nDefault } from 'i18n/default';

import QuaterPanel from './quater/QuaterPanel';
import { dayStart, dayEnd, getQuaterFromDate } from './utils/date';
import {
  noop,
  popPositionMap,
  commonProps,
  commonPropTypes
} from './constants';

const quaterMonthMap = {
  0: 0,
  1: 3,
  2: 6,
  3: 9
};

function getQuaterLastDay(quater, year) {
  const quaterLastDayMap = {
    0: [2, 31],
    1: [5, 30],
    2: [8, 30],
    3: [11, 31]
  };

  return new Date(year, ...quaterLastDayMap[quater]);
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
  let quater;
  if (selected) {
    quater = getQuaterFromDate(selected);
  }

  return {
    value: quater,
    actived,
    selected,
    openPanel: false,
    showPlaceholder
  };
}

class QuaterPicker extends (PureComponent || Component) {
  static propTypes = {
    ...commonPropTypes
  };

  static defaultProps = {
    ...commonProps,
    placeholder: '',
    format: 'YYYY-MM-DD'
  };

  constructor(props) {
    super(props);
    this.state = extractStateFromProps(props);
  }

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  onChangeQuater = val => {
    this.setState({
      actived: val
    });
  };

  onSelectQuater = quater => {
    const { actived } = this.state;
    const { onChange } = this.props;
    const year = actived.getFullYear();
    const month = quaterMonthMap[quater];

    if (this.isDisabled(quater)) return;

    const begin = new Date(year, month, 1);
    const end = getQuaterLastDay(quater, year);
    const ret = [dayStart(begin), dayEnd(end)];

    this.setState({
      value: quater,
      selected: begin,
      actived: begin,
      openPanel: false,
      showPlaceholder: false
    });

    onChange(ret);
  };

  onClearInput = evt => {
    evt.stopPropagation();
    this.props.onChange([]);
  };

  isDisabled = quater => {
    const { disabledDate } = this.props;
    const { actived } = this.state;
    const year = actived.getFullYear();
    const month = quaterMonthMap[quater];
    const begin = new Date(year, month, 1);
    const end = getQuaterLastDay(quater, year);
    const ret = [dayStart(begin), dayEnd(end)];

    if (disabledDate) return disabledDate(ret);

    return false;
  };

  renderPicker(i18n) {
    const { openPanel, actived, selected } = this.state;
    let quaterPicker;
    if (openPanel) {
      quaterPicker = (
        <div className="quater-picker" ref={ref => (this.picker = ref)}>
          <QuaterPanel
            actived={actived}
            selected={selected}
            onChange={this.onChangeQuater}
            onSelect={this.onSelectQuater}
            disabledDate={this.isDisabled}
            i18n={i18n}
          />
        </div>
      );
    }

    return quaterPicker;
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
    const wrapperCls = `${prefix}-datetime-picker ${className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--filled': !showPlaceholder,
      'picker-input--disabled': disabled
    });
    const widthStyle = getWidth(width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Reciever componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => {
            let inputVal;
            if (selected) {
              inputVal =
                i18n.mark === 'zh-CN'
                  ? `${selected.getFullYear()}年${i18n.panel.quaterNames[value]}`
                  : `${i18n.panel.quaterNames[
                      value
                    ]} of ${selected.getFullYear()}`;
            }
            const placeholderText = placeholder || i18n.quater;
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
        </Reciever>
      </div>
    );
  }
}

export default QuaterPicker;
