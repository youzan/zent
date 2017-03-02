import React, { Component } from 'react';
import classNames from 'zent-utils/classnames';
import MonthPanel from './month/MonthPanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT } from './utils/';
import { formatDate } from './utils/format';
import clickOutside from './utils/clickOutside';
import { MONTH_PROPS } from './constants/';

function getState(props) {
  let showPlaceholder;
  let selected;
  if (props.value) {
    showPlaceholder = false;
    selected = new Date(props.value);
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
  static defaultProps = MONTH_PROPS

  constructor(props) {
    super(props);
    let state = getState(props);
    this.state = state;
  }

  componentWillReceiveProps(next) {
    let state = getState(next);
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
    const prefixCls = `${props.prefix}-datetime-picker ${props.className}`;
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
            disabledDate={props.disabledDate}
            onChange={this.onChangeMonth}
            onSelect={this.onSelectMonth}
          />
          <PanelFooter
            linkText="当前月"
            linkCls="link--current"
            onClickLink={() => this.onSelectMonth(CURRENT)}
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
