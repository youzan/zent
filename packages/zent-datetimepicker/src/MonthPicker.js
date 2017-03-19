import React, { Component, PropTypes } from 'react';
import classNames from 'zent-utils/classnames';
import Input from 'zent-input';

import MonthPanel from './month/MonthPanel';
import PanelFooter from './common/PanelFooter';
import clickOutside from './utils/clickOutside';
import { CURRENT } from './utils/';
import { formatDate, parseDate } from './utils/format';
import { noop } from './constants/';

function extractStateFromProps(props) {
  let showPlaceholder;
  let selected;
  if (props.value) {
    showPlaceholder = false;
    selected = parseDate(props.value, props.format);
  } else {
    showPlaceholder = true;
    selected = new Date();
  }

  return {
    value: formatDate(selected, props.format),
    actived: selected,
    selected,
    openPanel: false,
    showPlaceholder
  };
}

class MonthPicker extends Component {
  static PropTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    confirmText: PropTypes.string,
    format: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    prefix: 'zent',
    className: '',
    placeholder: '请选择月份',
    confirmText: '确认',
    format: 'YYYY-MM',
    onChange: noop
  }

  constructor(props) {
    super(props);
    this.state = extractStateFromProps(props);
  }

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  clickOutside = e => {
    if (!this.picker.contains(e.target)) {
      this.setState({
        openPanel: false
      });
    }
  }

  onChangeMonth = (val) => {
    this.setState({
      actived: val
    });
  }

  onSelectMonth = (val) => {
    this.setState({
      selected: val,
      actived: val
    });
  }

  onClickInput = () => {
    if (this.props.disabled) return;
    this.setState({
      openPanel: !this.state.openPanel
    });
  }

  onClearInput = (evt) => {
    evt.stopPropagation();
    this.props.onChange('');
  }

  onConfirm = () => {
    const value = formatDate(this.state.selected, this.props.format);
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
    const wrapperCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--filled': !state.showPlaceholder,
      'picker-input--disabled': props.disabled
    });

    let monthPicker;
    if (state.openPanel) {
      monthPicker = (
        <div className="month-picker">
          <MonthPanel
            actived={state.actived}
            selected={state.selected}
            onChange={this.onChangeMonth}
            onSelect={this.onSelectMonth}
          />
          <PanelFooter
            buttonText={props.confirmText}
            linkText="当前月"
            linkCls="link--current"
            onClickLink={() => this.onSelectMonth(CURRENT)}
            onClickButton={this.onConfirm}
          />
        </div>
      );
    }

    return (
      <div className={wrapperCls} ref={ref => this.picker = ref}>
        <div className="picker-wrapper">
          <div className={inputCls} onClick={this.onClickInput}>
            <Input
              value={state.showPlaceholder ? props.placeholder : state.value}
              onChange={noop}
              disabled={props.disabled}
            />

            <span className="zenticon zenticon-calendar-o"></span>
            <span onClick={this.onClearInput} className="zenticon zenticon-close-circle"></span>
          </div>
          {state.openPanel ? monthPicker : ''}
        </div>
      </div>
    );
  }
}

export default clickOutside(MonthPicker);
