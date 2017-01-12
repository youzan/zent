import React, { Component } from 'react';
import PanelHeader from '../common/PanelHeader';
import DatePanelBody from './DatePanelBody';
import MonthPanel from '../month/MonthPanel';
import TimePanel from '../time/TimePanel';
import { goMonths } from '../utils/';

export default class DatePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTime: props.showTime !== undefined,
      showMonth: false
    };
  }
  prevMonth = () => {
    let prev = goMonths(this.props.actived, -1);
    this.props.onChange(prev);
  }
  nextMonth = () => {
    let next = goMonths(this.props.actived, 1);
    this.props.onChange(next);
  }
  showMonth = () => {
    this.setState({
      showMonth: true,
      showTime: false
    });
  }

  /*
   * 在 monthPicker 的时候选择年不隐藏 monthPanel.
   */
  onSelectMonth = (val, hide) => {
    this.props.onChange(val);
    this.setState({
      showMonth: hide || false,
      showTime: this.props.showTime !== undefined && !hide
    });
  }
  render() {
    const state = this.state;
    const props = this.props;
    const title = `${props.actived.getFullYear()}年${props.actived.getMonth() + 1}月`;
    let monthPanel;
    let timePanel;
    if (state.showMonth) {
      monthPanel = (<MonthPanel
        actived={props.actived}
        selected={props.selected}
        onSelect={this.onSelectMonth}
        />);
    }
    if (props.showTime) {
      timePanel = (
        <TimePanel
          actived={props.showTime.actived}
          format={props.showTime.format}
          disabledTime={props.showTime.disabledTime && props.showTime.disabledTime()}
          onChange={props.showTime.onChange}
          />
      );
    }

    return (
      <div className="date-panel">
        <PanelHeader
          title={title}
          onClick={this.showMonth}
          prev={this.prevMonth}
          next={this.nextMonth}
          />
        <DatePanelBody
          actived={props.actived}
          range={props.range}
          selected={props.selected}
          disabledDate={props.disabledDate}
          onSelect={props.onSelect}
          onHover={props.onHover}
          />
        {state.showMonth ? monthPanel : ''}
        {state.showTime ? timePanel : ''}
      </div>
    );
  }
}

