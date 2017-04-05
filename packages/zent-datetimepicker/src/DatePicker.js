import React, { Component, PropTypes } from 'react';
import classNames from 'zent-utils/classnames';
import Input from 'zent-input';
import Popover from 'zent-popover';

import DatePanel from './date/DatePanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT_DAY, goMonths } from './utils';
import { formatDate, parseDate } from './utils/format';
import { timeFnMap, noop } from './constants/';

let returnType = 'string';

function extractStateFromProps(props) {
  let selected;
  let actived;
  let showPlaceholder;

  if (props.value) {
    const tmp = parseDate(props.value, props.format);
    if (tmp) {
      showPlaceholder = false;
      actived = selected = tmp;
    } else {
      console.warn('date and format don\'t match.'); // eslint-disable-line
      showPlaceholder = true;
      actived = new Date();
    }
  } else {
    showPlaceholder = true;
    actived = new Date();
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
    activedTime: actived,
    openPanel: false,
    showPlaceholder
  };
}

class DatePicker extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    confirmText: PropTypes.string,
    format: PropTypes.string,

    // min 和 max 可以传入和 format 一致的字符串或者 Date 实例
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    disabledDate: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    prefix: 'zent',
    className: '',
    placeholder: '请选择日期',
    confirmText: '确认',
    format: 'YYYY-MM-DD',
    min: '',
    max: '',
    disabledDate: noop,
    onChange: noop
  }

  constructor(props) {
    super(props);
    if (props.value) {
      if (typeof props.value === 'number') returnType = 'numer';
      if (props.value instanceof Date) returnType = 'date';
    }
    this.state = extractStateFromProps(props);
  }

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  onChangeDate = (val) => {
    this.setState({
      actived: val
    });
  }

  onSelectDate = (val) => {
    if (this.isDisabled(val)) return;

    this.setState({
      actived: val,
      selected: val
    });
  }

  onChangeTime = (val, type) => {
    const fn = timeFnMap[type];
    const tmp = new Date(this.state.activedTime);
    tmp[fn](val);

    this.setState({
      activedTime: tmp
    });
  }

  onChangeMonth = (type) => {
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
  }

  onClickInput = () => {
    if (this.props.disabled) return;

    this.setState({
      openPanel: !this.state.openPanel
    });
  }

  onClearInput = () => {
    this.props.onChange('');
  }

  /**
   * 如果传入为数字，返回值也为数字
   * 如果传入为 Date 的实例，返回值也为 Date 的实例
   * 默认返回 format 格式的字符串
   */

  getReturnValue(date, format) {
    if (returnType === 'numer') {
      return date.getTime();
    }

    if (returnType === 'date') {
      return date;
    }

    return formatDate(date, format);
  }

  onConfirm = () => {
    const { selected, activedTime } = this.state;
    const { format, showTime } = this.props;

    // 如果没有选择日期则默认选中当前日期

    let tmp = selected || new Date();
    if (this.isDisabled(tmp)) return;

    if (showTime) {
      tmp = new Date(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate(),
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
    this.props.onChange(ret);
  }

  isDisabled = (val) => {
    const { disabledDate, min, max, format } = this.props;

    if (disabledDate && disabledDate(val)) return true;
    if (min && val < parseDate(min, format)) return true;
    if (max && val > parseDate(max, format)) return true;

    return false;
  }

  renderPicker() {
    const state = this.state;
    const props = this.props;
    let showTime;
    let datePicker;

    if (props.showTime) {
      showTime = Object.assign({},
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
        <div className="date-picker" ref={ref => this.picker = ref}>
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
    this.setState({
      openPanel: !this.state.openPanel
    });
  }

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
      <div className={wrapperCls} >
        <Popover
          cushion={5}
          visible={state.openPanel}
          onVisibleChange={this.togglePicker}
          className={`${props.prefix}-datetime-picker-popover ${props.className}-popover`}
          position={Popover.Position.BottomLeft}
        >
          <Popover.Trigger.Click>
            <div className={inputCls} onClick={this.onClickInput}>
              <Input
                value={state.showPlaceholder ? props.placeholder : state.value}
                onChange={noop}
                disabled={props.disabled}
              />

              <span className="zenticon zenticon-calendar-o"></span>
              <span onClick={this.onClearInput} className="zenticon zenticon-close-circle"></span>
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
