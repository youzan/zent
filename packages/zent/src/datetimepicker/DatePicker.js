import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import Input from 'input';
import Popover from 'popover';
import PropTypes from 'prop-types';
import assign from 'lodash/assign';

import DatePanel from './date/DatePanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT_DAY, goMonths } from './utils';
import { formatDate, maybeParseDate, dayStart, setTime } from './utils/date';
import { timeFnMap, noop } from './constants/';

function extractStateFromProps(props) {
  let selected;
  let actived;
  let showPlaceholder;
  const {
    openPanel,
    value,
    format,
    min,
    max,
    defaultValue,
    defaultTime
  } = props;

  if (value) {
    const tmp = maybeParseDate(value, format);

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
     * defalutValue > min > max
     */

    if (defaultValue) {
      actived = maybeParseDate(defaultValue, format);
    } else if (min) {
      actived = maybeParseDate(min, format);
    } else if (max) {
      actived = maybeParseDate(max, format);
    } else {
      actived = dayStart();
    }

    actived = maybeParseDate(actived, format);
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
    prefix: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    confirmText: PropTypes.string,
    format: PropTypes.string,
    defaultTime: PropTypes.string,

    // onChange 返回值类型, date | number | string， 默认 string
    valueType: PropTypes.oneOf(['date', 'number', 'string']),
    // min 和 max 可以传入和 format 一致的字符串或者 Date 实例
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ]),
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ]),
    disabledDate: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    placeholder: '请选择日期',
    confirmText: '确定',
    format: 'YYYY-MM-DD',
    min: '',
    max: '',
    openPanel: false,
    disabledDate: noop,
    onChange: noop
  };

  retType = 'string';

  constructor(props) {
    super(props);
    const { value, valueType } = props;

    if (valueType) {
      this.retType = valueType;
    } else if (value) {
      if (typeof value === 'number') this.retType = 'number';
      if (value instanceof Date) this.retType = 'date';
    }

    this.state = extractStateFromProps(props);
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

  onSelectDate = val => {
    const { onClick } = this.props;
    if (this.isDisabled(val)) return;

    this.setState({
      actived: val,
      selected: val
    });
    onClick && onClick(val);
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
    evt.stopPropagation();
    this.props.onChange('');
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
    const { format, showTime, onClose, onChange } = this.props;

    // 如果没有选择日期则默认选中当前日期

    let tmp = selected || new Date();
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
    if (min && val < maybeParseDate(min, format)) return true;
    if (max && val >= maybeParseDate(max, format)) return true;

    return false;
  };

  renderPicker() {
    const state = this.state;
    const props = this.props;
    let showTime;
    let datePicker;

    if (props.showTime) {
      showTime = assign(
        {},
        {
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

      datePicker = (
        <div className="date-picker" ref={ref => (this.picker = ref)}>
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
          <PanelFooter
            buttonText={props.confirmText}
            onClickButton={this.onConfirm}
            linkText="今天"
            linkCls={linkCls}
            showLink={!isDisabled}
            onClickLink={() => this.onSelectDate(CURRENT_DAY)}
          />
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
    const state = this.state;
    const props = this.props;
    const wrapperCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--filled': !state.showPlaceholder,
      'picker-input--disabled': props.disabled
    });

    return (
      <div className={wrapperCls}>
        <Popover
          cushion={5}
          visible={state.openPanel}
          onVisibleChange={this.togglePicker}
          className={`${props.prefix}-datetime-picker-popover ${props.className}-popover`}
          position={Popover.Position.AutoBottomLeft}
        >
          <Popover.Trigger.Click>
            <div className={inputCls}>
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
          <Popover.Content>
            {this.renderPicker()}
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

export default DatePicker;
