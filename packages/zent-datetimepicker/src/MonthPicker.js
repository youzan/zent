import React, { Component } from 'react';
import classNames from 'zent-utils/classnames';
import MonthPanel from './month/MonthPanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT } from './utils/';
import { formatDate } from './utils/format';
import clickOutside from './utils/clickOutside';
import { MONTH_PROPS } from './constants/';

class MonthPicker extends Component {
  static defaultProps = MONTH_PROPS

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

  componentWillReceiveProps(next) {
    if (next.value) {
      let showPlaceholder = false;
      let selected = new Date(next.value);

      this.setState({
        value: formatDate(selected, next.format || this.props.format),
        actived: selected,
        selected,
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
    this.setState({
      openPanel: !this.state.openPanel
    });
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
    const { disabledDate, placeholder, className, prefix } = this.props;
    const prefixCls = `${prefix}-datetime-picker ${className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--empty': state.showPlaceholder
    });
    let monthPicker;
    if (state.openPanel) {
      monthPicker = (
        <div className="month-picker">
          <MonthPanel
            actived={state.actived}
            selected={state.selected}
            disabledDate={disabledDate}
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
            {state.showPlaceholder ? placeholder : state.value}
            <span className="zenticon zenticon-calendar-o"></span>
          </div>
          {state.openPanel ? monthPicker : ''}
        </div>
      </div>
    );
  }
}

export default clickOutside(MonthPicker);
