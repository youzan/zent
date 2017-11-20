import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import formatDate from 'zan-utils/date/formatDate';

import TimePanel from './time/TimePanel';
import PanelFooter from './common/PanelFooter';
import clickOutside from './utils/clickOutside';
import { TIME_PROPS } from './constants/';

class TimePicker extends (PureComponent || Component) {
  static defaultProps = TIME_PROPS;

  constructor(props) {
    super(props);
    let showPlaceholder;
    let selected;
    if (props.value) {
      showPlaceholder = false;
      selected = new Date(props.value);
    } else {
      showPlaceholder = true;
      selected = new Date();
    }
    this.state = {
      value: formatDate(selected, props.format),
      actived: selected,
      selected,
      openPanel: false,
      showPlaceholder
    };
  }

  clickOutside = e => {
    if (!this.picker.contains(e.target)) {
      this.setState({
        openPanel: false
      });
    }
  };

  onChangeTime = val => {
    this.setState({
      actived: val
    });
  };

  onSelectCurrent = () => {
    this.setState({
      actived: new Date()
    });
  };

  onClickInput = () => {
    this.setState({
      openPanel: !this.state.openPanel
    });
  };

  onConfirm = () => {
    const value = formatDate(this.state.actived, this.props.format);
    this.setState({
      value,
      openPanel: false,
      showPlaceholder: false
    });
    this.props.onChange(value);
  };

  render() {
    const { props, state } = this;
    const prefixCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--empty': state.showPlaceholder
    });
    let timePicker;
    if (state.openPanel) {
      timePicker = (
        <div className="time-picker">
          <TimePanel
            actived={state.actived}
            format={props.format}
            disabledTime={props.disabledTime()}
            onChange={this.onChangeTime}
          />
          <PanelFooter
            linkText="此刻"
            linkCls="link--current"
            onClickLink={this.onSelectCurrent}
            onClickButton={this.onConfirm}
          />
        </div>
      );
    }
    return (
      <div className={prefixCls} ref={ref => (this.picker = ref)}>
        <div className="picker-wrapper">
          <div className={inputCls} onClick={this.onClickInput}>
            {state.showPlaceholder ? props.placeholder : state.value}
          </div>
          {state.openPanel ? timePicker : ''}
        </div>
      </div>
    );
  }
}

export default clickOutside(TimePicker);
