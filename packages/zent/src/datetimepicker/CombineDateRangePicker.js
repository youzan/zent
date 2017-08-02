import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import Popover from 'popover';
import PropTypes from 'prop-types';

import DatePanel from './date/DatePanel';
import PanelFooter from './common/PanelFooter';
import { goMonths, isArray, isSameMonth } from './utils';
import { formatDate, maybeParseDate, dayStart, setTime } from './utils/date';
import { timeFnMap, noop } from './constants/';

let retType = 'string';

const isValidValue = val => {
  if (!isArray(val)) return false;
  const ret = val.filter(item => !!item);
  return ret.length === 2;
};

const getDateTime = (date, time) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
};

const extractStateFromProps = props => {
  const { format, min, max, defaultValue, defaultTime } = props;
  let showPlaceholder;
  let selected = [];
  let actived = [];
  let range = [];
  let value = [];

  if (isValidValue(props.value)) {
    showPlaceholder = false;
    selected = [
      maybeParseDate(props.value[0], format),
      maybeParseDate(props.value[1], format)
    ];
    const tmp = [setTime(selected[0]), setTime(selected[1])];
    range = tmp.slice();
    actived = tmp.slice();
    value = [formatDate(selected[0], format), formatDate(selected[1], format)];

    // 特殊处理：如果两个时间在同一个月，右边的面板月份加一
    if (isSameMonth(actived[0], actived[1])) {
      actived[1] = goMonths(actived[1], 1);
    }
  } else {
    showPlaceholder = true;
    value = [];
    let start;
    if (defaultValue && isValidValue(defaultValue)) {
      start = maybeParseDate(defaultValue[0], format);
    } else if (min) {
      start = maybeParseDate(min, format);
    } else if (max) {
      let maxDate = maybeParseDate(max, format);
      let timestamp = maxDate && maxDate.getTime();
      if (timestamp < Date.now()) {
        start = goMonths(maxDate, -1);
      }
    } else {
      start = dayStart();
    }
    actived = [start, goMonths(start, 1)];
  }
  if (defaultTime) {
    actived = actived.map(item => setTime(item, defaultTime));
    range = range.map(item => {
      return setTime(item, defaultTime);
    });
  }

  let activedTime;
  if (selected.length === 2) {
    activedTime = selected.slice();
  } else {
    activedTime = actived.slice();
  }

  return {
    value,
    range,
    selected,
    actived,
    activedTime,
    openPanel: false,
    showError: false,
    openStartTimePanel: false,
    openEndTimePanel: false,
    showPlaceholder
  };
};

class CombineDateRangePicker extends (PureComponent || Component) {
  static PropTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    placeholder: PropTypes.arrayOf(PropTypes.string),
    confirmText: PropTypes.string,
    valueType: PropTypes.oneOf(['date', 'number', 'string']),
    format: PropTypes.string,
    defaultTime: PropTypes.string,
    showTime: PropTypes.bool,
    disabledDate: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
    placeholder: ['开始日期', '结束日期'],
    confirmText: '确定',
    errorText: '请选择起止时间',
    format: 'YYYY-MM-DD',
    showTime: false,
    disabledDate: noop,
    onChange: noop
  };

  constructor(props) {
    super(props);

    const { value, valueType } = props;
    if (valueType) {
      retType = valueType;
    } else if (isValidValue(value)) {
      if (typeof value[0] === 'number') retType = 'number';
      if (value[0] instanceof Date) retType = 'date';
    }

    this.state = extractStateFromProps(props);
  }

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  onHover = val => {
    const { selected, range } = this.state;
    const scp = selected.slice();
    const rcp = range.slice();

    if (scp.length !== 1) {
      rcp.splice(0, 2);
      return;
    }

    if (rcp[0] && rcp[0] < val) {
      rcp.splice(1, 1, val);
      this.setState({
        range: rcp
      });
    }
  };

  onSelectDate = val => {
    const { selected, actived, range } = this.state;
    const { onClick } = this.props;
    const scp = selected.slice();
    const acp = actived.slice();
    const rcp = range.slice();
    let type;

    /**
     * 选择日期时，可能如下出现四种情况
     * 1. 还没有选择过，这次选择的日期作为开始日期
     * 2. 选择过一次，并且第二次选择日期大于第一次，这次选择的日期作为结束日期
     * 3. 有效选择过两次，清空之前的选择，重新设置这次选择的日期作为开始日期
     * 4. 选择过一次，并且这次选择的日期小于第一次，替换这次选择的日期为开始日期
     */
    if (scp.length === 2) {
      scp.splice(0, 2, val);
      rcp.splice(0, 2, val);
      acp.splice(0, 2, val, goMonths(val, 1));
      type = 'start';
      // 支持选择同一天
    } else if (
      scp[0] &&
      (scp[0] < val || formatDate(scp[0]) === formatDate(val))
    ) {
      scp.splice(1, 1, val);
      if (scp[0].getMonth() < val.getMonth()) {
        acp.splice(1, 1, val);
      }
      type = 'end';
    } else {
      acp.splice(0, 2, val, goMonths(val, 1));
      scp.splice(0, 1, val);
      rcp.splice(0, 1, val);
      type = 'start';
    }

    this.setState({
      selected: scp,
      actived: acp,
      range: rcp
    });

    onClick && onClick(val, type);
  };

  isDisabled = val => {
    const { disabledDate, format, min, max } = this.props;

    if (disabledDate && disabledDate(val)) return true;
    if (min && val < maybeParseDate(min, format)) return true;
    if (max && val >= maybeParseDate(max, format)) return true;

    return false;
  };

  onChangeDate = (val, i) => {
    const { actived } = this.state;
    const acp = actived.slice();
    acp.splice(i, 1, val);

    this.setState({
      actived: acp
    });
  };

  onChangeStart = val => {
    this.onChangeDate(val, 0);
  };

  onChangeEnd = val => {
    this.onChangeDate(val, 1);
  };

  onChangeTime = (val, i, type) => {
    const { activedTime } = this.state;
    const tcp = activedTime.slice();
    const fn = timeFnMap[type];

    tcp[i][fn](val);
    this.setState({
      activedTime: tcp
    });
  };

  onChangeStartTime = (val, type) => {
    this.onChangeTime(val, 0, type);
  };

  onChangeEndTime = (val, type) => {
    this.onChangeTime(val, 1, type);
  };

  // next&prev month 翻页效果联动
  onChangeMonth = type => {
    const baseMap = {
      prev: 0,
      next: 1
    };
    const typeMap = {
      prev: -1,
      next: 1
    };

    return () => {
      const { actived } = this.state;
      const base = actived[baseMap[type]];
      let acp = [base, base];
      acp.splice(baseMap[type], 1, goMonths(base, typeMap[type]));
      // acp = acp.map((item, i) => {
      //   return i === baseMap[type] ? goMonths(item, typeMap[type]) : item;
      // });

      this.setState({
        actived: acp
      });
    };
  };

  onOpenStartTime = () => {
    this.setState({
      openStartTimePanel: true,
      openEndTimePanel: false
    });
  };

  onOpenEndTime = () => {
    this.setState({
      openStartTimePanel: false,
      openEndTimePanel: true
    });
  };

  onClearInput = evt => {
    evt.stopPropagation();
    this.props.onChange([]);
  };

  /**
   * 如果传入为数字，返回值也为数字
   * 如果传入为 Date 的实例，返回值也为 Date 的实例
   * 默认返回 format 格式的字符串
   */

  getReturnValue(date, format) {
    if (retType === 'number') {
      return date.getTime();
    }

    if (retType === 'date') {
      return date;
    }

    return formatDate(date, format);
  }

  onConfirm = () => {
    const { selected, activedTime } = this.state;

    if (selected.length !== 2) {
      this.setState({
        showError: true
      });
      // eslint-disable-next-line
      let timer = setTimeout(() => {
        this.setState({
          showError: false
        });
        timer = null;
      }, 2000);

      return;
    }

    const { format, showTime } = this.props;

    let tmp = selected.slice();
    if (showTime) {
      tmp = [
        getDateTime(tmp[0], activedTime[0]),
        getDateTime(tmp[1], activedTime[1])
      ];
    }

    const vcp = [formatDate(tmp[0], format), formatDate(tmp[1], format)];
    this.setState({
      value: vcp,
      showPlaceholder: false,
      openPanel: false
    });

    const ret = [
      this.getReturnValue(tmp[0], format),
      this.getReturnValue(tmp[1], format)
    ];
    this.props.onChange(ret);
  };

  renderPicker() {
    const state = this.state;
    const props = this.props;
    let rangePicker;

    const getTimeConfig = type => {
      if (!props.showTime) return false;
      const handleMap = {
        start: this.onChangeStartTime,
        end: this.onChangeEndTime
      };
      const indexMap = {
        start: 0,
        end: 1
      };
      const timeStatusMap = {
        start: 'openEndTimePanel',
        end: 'openStartTimePanel'
      };
      const timeHandleMap = {
        start: this.onOpenStartTime,
        end: this.onOpenEndTime
      };

      return {
        hidePanel: state[timeStatusMap[type]],
        actived: state.activedTime[indexMap[type]],
        disabledTime: props.disabledTime && props.disabledTime(type),
        onChange: handleMap[type],
        onOpen: timeHandleMap[type]
      };
    };

    if (state.openPanel) {
      const pickerCls = classNames({
        'range-picker': true,
        'range-picker--showTime': props.showTime
      });
      rangePicker = (
        <div className={pickerCls} ref={ref => (this.picker = ref)}>
          <div className="date-picker">
            <DatePanel
              range={state.range}
              showTime={getTimeConfig('start')}
              actived={state.actived[0]}
              selected={state.selected}
              disabledDate={this.isDisabled}
              onSelect={this.onSelectDate}
              onChange={this.onChangeStart}
              onHover={this.onHover}
              onPrev={this.onChangeMonth('prev')}
              onNext={noop}
              showPrev
              showNext={false}
            />
          </div>
          <div className="date-picker">
            <DatePanel
              range={state.range}
              showTime={getTimeConfig('end')}
              actived={state.actived[1]}
              selected={state.selected}
              disabledDate={this.isDisabled}
              onSelect={this.onSelectDate}
              onChange={this.onChangeEnd}
              onHover={this.onHover}
              onPrev={noop}
              onNext={this.onChangeMonth('next')}
              showPrev={false}
              showNext
            />
          </div>
          <PanelFooter
            buttonText={props.confirmText}
            onClickButton={this.onConfirm}
            showError={state.showError}
            errorText={props.errorText}
          />
        </div>
      );
    }

    return rangePicker;
  }

  togglePicker = () => {
    const { onOpen, onClose, disabled } = this.props;
    const openPanel = !this.state.openPanel;

    if (disabled) return;

    openPanel ? onOpen && onOpen() : onClose && onClose();
    this.setState({
      openPanel: !this.state.openPanel
    });
  };

  render() {
    const state = this.state;
    const props = this.props;
    const prefixCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input--range picker-input': true,
      'picker-input--filled': !state.showPlaceholder,
      'picker-input--showTime': props.showTime,
      'picker-input--disabled': props.disabled
    });

    return (
      <div className={prefixCls}>
        <Popover
          cushion={5}
          visible={state.openPanel}
          onVisibleChange={this.togglePicker}
          className={`${props.prefix}-datetime-picker-popover ${props.className}-popover`}
          position={Popover.Position.AutoBottomLeft}
        >
          <Popover.Trigger.Click>
            <div className={inputCls}>
              {state.showPlaceholder
                ? props.placeholder.join(' 至 ')
                : state.value.join(' 至 ')}
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

export default CombineDateRangePicker;
