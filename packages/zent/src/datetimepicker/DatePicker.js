import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'input';
import Popover from 'popover';
import assign from 'lodash/assign';
import formatDate from 'zan-utils/date/formatDate';
import parseDate from 'zan-utils/date/parseDate';
import getWidth from 'utils/getWidth';

import DatePanel from './date/DatePanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT_DAY, goMonths, setSameDate } from './utils';
import { dayStart, dayEnd, setTime } from './utils/date';
import {
  timeFnMap,
  noop,
  popPositionMap,
  commonProps,
  commonPropTypes
} from './constants/';

function extractStateFromProps(props) {
  let selected;
  let actived;
  let showPlaceholder;
  const { openPanel, value, format, defaultValue, defaultTime } = props;

  if (value) {
    const tmp = parseDate(value, format);

    if (tmp) {
      showPlaceholder = false;
      selected = tmp;
      actived = setTime(tmp);
    } else {
      console.warn("date and format don't match."); // eslint-disable-line
      showPlaceholder = true;
      actived = dayStart();
    }
  } else {
    showPlaceholder = true;

    /**
     * 当前面板显示优先级：
     * defalutValue > currentDay
     */

    if (defaultValue) {
      actived = parseDate(defaultValue, format);
    } else {
      actived = dayStart();
    }

    actived = parseDate(actived, format);
  }

  if (defaultTime) {
    actived = setTime(actived, defaultTime);
  }
  /**
   * actived 用来临时存放日期，改变年份和月份的时候只会改动 actived 的值
   * selected 用来存放用户选择的日期，点击日期时会设置 selected 的值
   * activedTime 用来存放用户选择的时间
   */

  return {
    value: selected && formatDate(selected, props.format),
    actived,
    selected,
    activedTime: selected || actived,
    openPanel,
    showPlaceholder
  };
}

class DatePicker extends (PureComponent || Component) {
  static propTypes = {
    ...commonPropTypes,
    showTime: PropTypes.bool,
    onBeforeConfirm: PropTypes.func,
    onBeforeClear: PropTypes.func
  };

  static defaultProps = {
    ...commonProps,
    placeholder: '请选择日期'
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

  getDate = () => {
    return this.state.actived;
  };

  onChangeDate = val => {
    this.setState({
      actived: val
    });
  };

  onSelectDate = val => {
    const { onClick } = this.props;
    const { activedTime } = this.state;
    if (this.isDisabled(val)) return;
    // update activedTime here
    this.setState({
      actived: val,
      selected: val,
      activedTime: setSameDate(activedTime, val)
    });
    onClick && onClick(val);
    if (!this.isfooterShow) {
      this.onConfirm();
    }
  };

  onChangeTime = (val, type) => {
    const fn = timeFnMap[type];
    const tmp = new Date(this.state.activedTime);
    tmp[fn](val);

    this.setState({
      activedTime: tmp
    });
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
    const { onChange, onBeforeClear } = this.props;
    if (onBeforeClear && !onBeforeClear()) return;

    evt.stopPropagation();
    onChange('');
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
    const { selected, activedTime } = this.state;
    const { format, showTime, onClose, onChange, onBeforeConfirm } = this.props;

    if (onBeforeConfirm && !onBeforeConfirm()) return;
    // 如果没有选择日期则默认选中当前日期
    let tmp = selected || dayStart();
    if (this.isDisabled(tmp)) return;

    if (showTime) {
      tmp = new Date(
        tmp.getFullYear(),
        tmp.getMonth(),
        tmp.getDate(),
        activedTime.getHours(),
        activedTime.getMinutes(),
        activedTime.getSeconds()
      );
    }

    this.setState({
      value: formatDate(tmp, format),
      openPanel: false,
      showPlaceholder: false
    });

    const ret = this.getReturnValue(tmp, format);
    onChange(ret);
    onClose && onClose();
  };

  isDisabled = val => {
    const { disabledDate, min, max, format } = this.props;
    if (disabledDate && disabledDate(val)) return true;
    if (min && dayEnd(val) < parseDate(min, format)) return true;
    if (max && dayStart(val) > parseDate(max, format)) return true;

    return false;
  };

  renderPicker() {
    const { state, props } = this;
    let showTime;
    let datePicker;

    // let isShow
    if (props.showTime) {
      showTime = assign(
        {
          min: props.min && parseDate(props.min, props.format),
          max: props.max && parseDate(props.max, props.format),
          actived: state.activedTime,
          disabledTime: noop
        },
        {
          disabledTime: props.disabledTime && props.disabledTime(),
          onChange: this.onChangeTime
        }
      );
    }

    // 打开面板的时候才渲染
    if (state.openPanel) {
      const isDisabled = this.isDisabled(CURRENT_DAY);
      const linkCls = classNames({
        'link--current': true,
        'link--disabled': isDisabled
      });
      const datePickerCls = classNames({
        'date-picker': true,
        small: this.isfooterShow
      });

      datePicker = (
        <div className={datePickerCls} ref={ref => (this.picker = ref)}>
          <DatePanel
            showTime={showTime}
            actived={state.actived}
            selected={state.selected}
            disabledDate={this.isDisabled}
            onSelect={this.onSelectDate}
            onChange={this.onChangeDate}
            onPrev={this.onChangeMonth('prev')}
            onNext={this.onChangeMonth('next')}
          />
          {this.isfooterShow ? (
            <PanelFooter
              buttonText={props.confirmText}
              onClickButton={this.onConfirm}
              linkText="今天"
              linkCls={linkCls}
              showLink={!isDisabled}
              onClickLink={() => this.onSelectDate(CURRENT_DAY)}
            />
          ) : null}
        </div>
      );
    }

    return datePicker;
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
    const { state, props } = this;
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
                value={state.showPlaceholder ? props.placeholder : state.value}
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

export default DatePicker;
