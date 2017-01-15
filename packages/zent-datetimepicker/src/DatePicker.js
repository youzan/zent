import React, { Component } from 'react';
import classNames from 'classnames';
import DatePanel from './date/DatePanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT_DAY } from './utils';
import { format, parse } from './utils/format';
import clickOutSide from './utils/clickOutside';
import { DATE_PROPS, TIME_PROPS } from './constants/';

class DatePicker extends Component {
  static defaultProps = DATE_PROPS

  constructor(props) {
    super(props);
    let showPlaceholder;
    let selected;
    let actived;
    if (props.value) {
      showPlaceholder = false;
      const dateArr = parse(props.value, props.format);
      actived = selected = new Date(...dateArr);
    } else {
      showPlaceholder = true;
      actived = new Date();
    }
    this.state = {
      value: selected && format(selected, props.format),
      actived,
      selected,
      activedTime: actived,
      openPanel: false,
      showPlaceholder
    };
  }
  componentWillReceiveProps(next) {
    if (next.hasOwnProperty('value')) {
      if (next.value) {
        let showPlaceholder = false;
        let selected = new Date(next.value);

        this.setState({
          value: format(selected, next.format || this.props.format),
          actived: selected,
          selected,
          activedTime: selected,
          openPanel: false,
          showPlaceholder
        });
      } else {
        let showPlaceholder = true;
        let actived = new Date;

        this.setState({
          value: '',
          actived,
          selected: '',
          activedTime: actived,
          openPanel: false,
          showPlaceholder
        });
      }
    }
  }

  clickOutSide = e => {
    if (!this.picker.contains(e.target)) {
      this.setState({
        openPanel: false
      });
    }
  }

  onChangeDate = (val) => {
    this.setState({
      actived: val
    });
  }

  onSelectDate = (val) => {
    if (this.isDisabled(val)) {
      return;
    }
    this.setState({
      actived: val,
      selected: val
    });
  }

  isDisabled = (val) => {
    const props = this.props;
    if (props.disabledDate && props.disabledDate(val)) return true;
    if (props.min && val < new Date(props.min)) return true;
    if (props.max && val > new Date(props.max)) return true;
    return false;
  }

  onChangeTime = (val) => {
    this.setState({
      activedTime: val
    });
  }

  onClickInput = () => {
    if (this.props.disabled) return;
    this.setState({
      openPanel: !this.state.openPanel
    });
  }

  onConfirm = () => {
    let value;
    const { selected, activedTime } = this.state;
    if (!selected) return;
    if (this.props.showTime) {
      const tmp = new Date(`
        ${selected.getFullYear()}-
        ${selected.getMonth() + 1}-
        ${selected.getDate()}
        ${activedTime.getHours()}:
        ${activedTime.getMinutes()}:
        ${activedTime.getSeconds()}
      `);
      value = format(tmp, this.props.format);
    } else {
      value = format(selected, this.props.format);
    }
    this.setState({
      value,
      openPanel: false,
      showPlaceholder: false
    });
    this.props.onChange(value);
  }

  render() {
    const state = this.state;
    const props = this.props;
    const prefixCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--empty': state.showPlaceholder,
      'picker-input--disabled': props.disabled
    });
    let showTime;
    let datePicker;
    if (props.showTime) {
      showTime = Object.assign({},
        {
          actived: state.activedTime,
          format: TIME_PROPS.format,
          disabledTime: TIME_PROPS.disabledTime
        },
        props.showTime || {},
        {
          onChange: this.onChangeTime
        }
      );
    }
    if (state.openPanel) {
      const linkCls = classNames({
        'link--current': true,
        'link--disabled': this.isDisabled(CURRENT_DAY)
      });
      datePicker = (
        <div className="date-picker">
          <DatePanel
            showTime={showTime}
            actived={state.actived}
            selected={state.selected}
            disabledDate={this.isDisabled}
            onSelect={this.onSelectDate}
            onChange={this.onChangeDate}
            />
          <PanelFooter
            linkText="今天"
            linkCls={linkCls}
            onClickLink={() => this.onSelectDate(CURRENT_DAY)}
            onClickButton={this.onConfirm}
            />
        </div>
      );
    }
    return (
      <div className={prefixCls} ref={ref => this.picker = ref}>
        <div className="picker-wrapper">
          <div className={inputCls} onClick={this.onClickInput}>
            {state.showPlaceholder ? props.placeholder : state.value}
          </div>
          {state.openPanel ? datePicker : ''}
        </div>
      </div>
    );
  }
}

export default clickOutSide(DatePicker);
