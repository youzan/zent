import React, { Component } from 'react';
import classNames from 'zent-utils/classnames';
import DatePanel from './date/DatePanel';
import PanelFooter from './common/PanelFooter';
import { goMonths, isFunction, isArray } from './utils';
import { formatDate, parseDate } from './utils/format';
import clickOutside from './utils/clickOutside';
import { RANGE_PROPS, TIME_PROPS } from './constants';

class DateRangePicker extends Component {
  static defaultProps = RANGE_PROPS
  constructor(props) {
    super(props);
    let showPlaceholder;
    let selected = [];
    let actived = [];
    if (props.value) {
      showPlaceholder = false;
      const tmp = [parseDate(props.value[0], props.format), parseDate(props.value[1], props.format)];
      selected = tmp.slice();
      actived = tmp.slice();
    } else {
      showPlaceholder = true;
      let now = new Date();
      actived = [now, goMonths(now, 1)];
    }
    this.state = {
      value: [],
      range: [],
      selected,
      actived,
      activedTime: actived.slice(),
      openPanel: false,
      showPlaceholder
    };
  }

  componentWillReceiveProps(next) {
    if (next.value) {
      const showPlaceholder = false;
      const selected = [new Date(next.value[0]), new Date(next.value[1])];

      this.setState({
        value: [
          formatDate(selected[0], next.format || this.props.format),
          formatDate(selected[1], next.format || this.props.format)
        ],
        selected,
        actived: selected.slice(),
        activedTime: selected.slice(),
        openPanel: false,
        showPlaceholder
      });
    }
  }

  clickOutside = e => {
    if (!this.picker.contains(e.target)) {
      this.setState({
        openPanel: false
      });
    }
  }

  onHover = (val) => {
    const { selected, range } = this.state;
    const scp = selected.slice();
    const rcp = range.slice();
    if (scp.length !== 1) {
      rcp.splice(0, 2);
      return false;
    }

    if (rcp[0] && rcp[0] < val) {
      rcp.splice(1, 1, val);
      this.setState({
        range: rcp
      });
    }
  }

  onSelect = (val) => {
    const { selected, actived, range } = this.state;
    const scp = selected.slice();
    const acp = actived.slice();
    const rcp = range.slice();

    if (scp.length === 2) {
      scp.splice(0, 2, val);
      rcp.splice(0, 2, val);
      acp.splice(0, 2, val, goMonths(val, 1));
    } else if (scp[0] && scp[0] < val) {
      scp.splice(1, 1, val);
      if (scp[0].getMonth() < val.getMonth()) {
        acp.splice(1, 1, val);
      }
    } else {
      scp.splice(0, 1, val);
      rcp.splice(0, 1, val);
      acp.splice(0, 1, val, goMonths(val, 1));
    }
    this.setState({
      selected: scp,
      actived: acp,
      range: rcp
    });
  }

  isDisabled = (val) => {
    const props = this.props;
    if (props.disabledDate) {
      if (isFunction(props.disabledDate)) {
        return props.disabledDate(val);
      }
      if (isArray(props.disabledDate)) {
        return !(val > new Date(props.disabledDate[0]) && val < new Date(props.disabledDate[1]));
      }
    }
    return false;
  }

  onChangeDate = (val, i) => {
    const { actived } = this.state;
    const acp = actived.slice();
    acp.splice(i, 1, val);
    this.setState({
      actived: acp
    });
  }

  onChangeStart = (val) => {
    this.onChangeDate(val, 0);
  }

  onChangeEnd = (val) => {
    this.onChangeDate(val, 1);
  }

  onChangeTime = (val, i) => {
    const { activedTime } = this.state;
    const tcp = activedTime.slice();
    tcp.splice(i, 1, val);
    this.setState({
      activedTime: tcp
    });
  }

  onChangeStartTime = (val) => {
    this.onChangeTime(val, 0);
  }

  onChangeEndTime = (val) => {
    this.onChangeTime(val, 1);
  }

  onClickInput = () => {
    this.setState({
      openPanel: !this.state.openPanel
    });
  }

  onConfirm = () => {
    const { value, selected, activedTime } = this.state;
    const props = this.props;
    if (selected.length !== 2) {
      return false;
    }
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
    let vcp = value.slice();
    if (props.showTime) {
      const tmp = [
        getDateTime(selected[0], activedTime[0]),
        getDateTime(selected[1], activedTime[1])
      ];
      const tmpFormat = `${props.format} ${props.showTime.format || TIME_PROPS.format}`;
      vcp = [formatDate(tmp[0], tmpFormat), formatDate(tmp[1], tmpFormat)];
    } else {
      vcp = [formatDate(selected[0], props.format), formatDate(selected[1], props.format)];
    }

    this.setState({
      value: vcp,
      showPlaceholder: false,
      openPanel: false
    });
    this.props.onChange(vcp);
  }

  render() {
    const state = this.state;
    const props = this.props;
    const prefixCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input--range picker-input': true,
      'picker-input--empty': state.showPlaceholder,
      'picker-input--showTime': props.showTime
    });
    let rangePicker;

    const getTimeConfig = (type) => {
      const timeFnMap = {
        start: this.onChangeStartTime,
        end: this.onChangeEndTime
      };
      const indexMap = {
        start: 0,
        end: 1
      };
      return Object.assign({},
        {
          actived: state.activedTime[indexMap[type]],
          format: TIME_PROPS.format,
          disabledTime: TIME_PROPS.disabledTime
        },
        props.showTime || {},
        {
          disabledTime: props.disabledTime && props.disabledTime(type),
          onChange: timeFnMap[type]
        }
      );
    };
    if (state.openPanel) {
      const pickerCls = classNames({
        'range-picker': true,
        'range-picker--showTime': props.showTime
      });
      rangePicker = (
        <div className={pickerCls}>
          <div className="date-picker">
            <DatePanel
              range={state.range}
              showTime={getTimeConfig('start')}
              actived={state.actived[0]}
              selected={state.selected}
              disabledDate={this.isDisabled}
              onSelect={this.onSelect}
              onChange={this.onChangeStart}
              onHover={this.onHover}
            />
          </div>
          <div className="date-picker">
            <DatePanel
              range={state.range}
              showTime={getTimeConfig('end')}
              actived={state.actived[1]}
              selected={state.selected}
              disabledDate={this.isDisabled}
              onSelect={this.onSelect}
              onChange={this.onChangeEnd}
              onHover={this.onHover}
            />
          </div>
          <PanelFooter
            onClickButton={this.onConfirm}
          />
        </div >
      );
    }

    return (
      <div className={prefixCls} ref={ref => this.picker = ref}>
        <div className="picker-wrapper">
          <div className={inputCls} onClick={this.onClickInput}>
            {state.showPlaceholder ? props.placeholder.join(' ~ ') : state.value.join(' ~ ')}
            <span className="zenticon zenticon-calendar-o"></span>
          </div>
          {state.openPanel ? rangePicker : ''}
        </div>
      </div>
    );
  }
}

export default clickOutside(DateRangePicker);
