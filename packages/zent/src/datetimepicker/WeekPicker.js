import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import Input from 'input';
import Popover from 'popover';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import formatDate from 'zan-utils/date/formatDate';
import parseDate from 'zan-utils/date/parseDate';
import getWidth from 'utils/getWidth';

import DatePanel from './date/DatePanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT_DAY, goMonths, goDays } from './utils';
import { dayStart, setTime } from './utils/date';
import {
  noop,
  popPositionMap,
  commonProps,
  commonPropTypes
} from './constants/';

function getSelectedWeek(val, start = 1) {
  const offset = val.getDay();
  return [goDays(val, start - offset), goDays(val, 6 + start - offset)];
}

function extractStateFromProps(props) {
  let selected;
  let actived;
  let showPlaceholder;
  const { openPanel, value, format, defaultValue, startDay } = props;

  // 如果 value 是数组就取数组第一个值，否则就取 value
  const hasValue = isArray(value) ? value[0] : value;

  if (hasValue) {
    const tmp = parseDate(hasValue, format);

    if (tmp) {
      showPlaceholder = false;
      selected = getSelectedWeek(tmp, startDay);
      actived = setTime(tmp);
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

    actived = parseDate(actived, format);
  }

  /**
   * actived 用来临时存放日期，改变年份和月份的时候只会改动 actived 的值
   * selected 用来存放用户选择的日期，点击日期时会设置 selected 的值
   */

  let ret;
  if (selected) {
    ret = selected.map(item => formatDate(item, props.format));
  }
  return {
    value: ret,
    actived,
    selected,
    openPanel,
    showPlaceholder
  };
}

class WeekPicker extends (PureComponent || Component) {
  static propTypes = {
    ...commonPropTypes,
    startDay: PropTypes.number
  };

  static defaultProps = {
    ...commonProps,
    placeholder: '请选择自然周',
    startDay: 1
  };

  retType = 'string';

  constructor(props) {
    super(props);
    const { value, valueType } = props;

    if (valueType) {
      this.retType = valueType.toLowerCase();
    } else if (value) {
      if (typeof value === 'number') this.retType = 'number';
      if (value instanceof Date) this.retType = 'date';
    }

    this.state = extractStateFromProps(props);
    // 没有footer的逻辑
    this.isfooterShow = props.showTime || props.isFooterVisble;
  }

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  onChangeDate = val => {
    this.setState({
      actived: val
    });
  };

  onHover = val => {
    const { startDay } = this.props;
    const offset = val.getDay();
    const week = [
      goDays(val, -offset + startDay - 1),
      goDays(val, 7 + startDay - offset)
    ];

    this.setState({
      range: week
    });
  };

  onSelectDate = val => {
    const { onClick, startDay } = this.props;
    const week = getSelectedWeek(val, startDay);

    this.setState({
      selected: week
    });

    onClick && onClick(week);
    if (!this.isfooterShow) {
      this.onConfirm();
    }
  };

  onChangeMonth = type => {
    const typeMap = {
      prev: -1,
      next: 1
    };

    return () => {
      const { actived } = this.state;
      const acp = goMonths(actived, typeMap[type]);

      this.setState({
        actived: acp
      });
    };
  };

  onClearInput = evt => {
    evt.stopPropagation();
    this.props.onChange([]);
  };

  onMouseOut = evt => {
    evt.stopPropagation();
    this.setState({
      range: []
    });
  };

  /**
   * 如果传入为数字，返回值也为数字
   * 如果传入为 Date 的实例，返回值也为 Date 的实例
   * 默认返回 format 格式的字符串
   */

  getReturnValue(date, format) {
    if (this.retType === 'number') {
      return date.getTime();
    }

    if (this.retType === 'date') {
      return date;
    }

    return formatDate(date, format);
  }

  onConfirm = () => {
    const { selected } = this.state;
    const { format, onClose, onChange } = this.props;

    if (selected.length === 0) {
      return;
    }

    let tmp = selected.slice();
    if (this.isDisabled(tmp[0] || this.isDisabled(tmp[1]))) return;

    const value = tmp.map(item => formatDate(item, format));
    this.setState({
      value,
      openPanel: false,
      showPlaceholder: false,
      range: []
    });

    const ret = tmp.map(item => this.getReturnValue(item, format));
    onChange(ret);
    onClose && onClose();
  };

  isDisabled = val => {
    const { disabledDate, min, max, format } = this.props;

    if (disabledDate && disabledDate(val)) return true;
    if (min && val < parseDate(min, format)) return true;
    if (max && val > parseDate(max, format)) return true;

    return false;
  };

  renderPicker() {
    const { props, state } = this;
    let weekPicker;

    // 打开面板的时候才渲染
    if (state.openPanel) {
      const isDisabled = this.isDisabled(CURRENT_DAY);
      const linkCls = classNames({
        'link--current': true,
        'link--disabled': isDisabled
      });

      const weekPickerCls = classNames({
        'week-picker': true,
        small: this.isfooterShow
      });

      weekPicker = (
        <div className={weekPickerCls} ref={ref => (this.picker = ref)}>
          <div onMouseOut={this.onMouseOut}>
            <DatePanel
              range={state.range}
              actived={state.actived}
              selected={state.selected}
              disabledDate={this.isDisabled}
              onHover={this.onHover}
              onSelect={this.onSelectDate}
              onChange={this.onChangeDate}
              onPrev={this.onChangeMonth('prev')}
              onNext={this.onChangeMonth('next')}
            />
          </div>
          {this.isfooterShow ? (
            <PanelFooter
              buttonText={props.confirmText}
              onClickButton={this.onConfirm}
              linkText="本周"
              linkCls={linkCls}
              showLink={!isDisabled}
              onClickLink={() => this.onSelectDate(CURRENT_DAY)}
            />
          ) : null}
        </div>
      );
    }

    return weekPicker;
  }

  togglePicker = () => {
    const { onOpen, onClose, disabled } = this.props;
    const openPanel = !this.state.openPanel;
    if (disabled) return;

    openPanel ? onOpen && onOpen() : onClose && onClose();
    this.setState({
      openPanel
    });
  };

  render() {
    const { props, state } = this;
    const wrapperCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--filled': !state.showPlaceholder,
      'picker-input--disabled': props.disabled
    });
    const widthStyle = getWidth(props.width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Popover
          cushion={5}
          visible={state.openPanel}
          onVisibleChange={this.togglePicker}
          className={`${props.prefix}-datetime-picker-popover ${props.className}-popover`}
          position={popPositionMap[props.popPosition.toLowerCase()]}
        >
          <Popover.Trigger.Click>
            <div
              style={widthStyle}
              className={inputCls}
              onClick={evt => evt.preventDefault()}
            >
              <Input
                name={props.name}
                value={
                  state.showPlaceholder
                    ? props.placeholder
                    : state.value.join(' 至 ')
                }
                onChange={noop}
                disabled={props.disabled}
              />

              <span className="zenticon zenticon-calendar-o" />
              <span
                onClick={this.onClearInput}
                className="zenticon zenticon-close-circle"
              />
            </div>
          </Popover.Trigger.Click>
          <Popover.Content>{this.renderPicker()}</Popover.Content>
        </Popover>
      </div>
    );
  }
}

export default WeekPicker;
