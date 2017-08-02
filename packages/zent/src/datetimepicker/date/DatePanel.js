import React, { Component, PureComponent } from 'react';
import PanelHeader from '../common/PanelHeader';
import DatePanelBody from './DatePanelBody';
import MonthPanel from '../month/MonthPanel';
import TimePanel from '../time/TimePanel';

export default class DatePanel extends (PureComponent || Component) {
  static defaultProps = {
    showPrev: true,
    showNext: true
  };

  state = {
    showMonth: false
  };

  showMonth = () => {
    this.setState({
      showMonth: true
    });
  };

  /*
   * 在 monthPicker 的时候选择年不隐藏 monthPanel.
   */
  onSelectMonth = (val, hide) => {
    this.props.onChange(val);
    this.setState({
      showMonth: hide || false
    });
  };

  render() {
    const state = this.state;
    const props = this.props;
    const title = `${props.actived.getFullYear()}年${props.actived.getMonth() +
      1}月`;
    let monthPanel;
    let timePanel;
    if (state.showMonth) {
      monthPanel = (
        <MonthPanel
          actived={props.actived}
          selected={props.selected}
          onSelect={this.onSelectMonth}
        />
      );
    }
    if (props.showTime) {
      timePanel = (
        <TimePanel
          hidePanel={props.showTime.hidePanel}
          actived={props.showTime.actived}
          disabledTime={props.showTime.disabledTime}
          onChange={props.showTime.onChange}
          onClose={props.showTime.onClose}
          onOpen={props.showTime.onOpen}
        />
      );
    }

    return (
      <div className="date-panel">
        <PanelHeader
          title={title}
          onClickTitle={this.showMonth}
          prev={props.onPrev}
          next={props.onNext}
          showPrev={props.showPrev}
          showNext={props.showNext}
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
        {props.showTime ? timePanel : ''}
      </div>
    );
  }
}
