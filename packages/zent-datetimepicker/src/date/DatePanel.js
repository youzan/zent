import React, { Component } from 'react';
import PanelHeader from '../common/PanelHeader';
import DatePanelBody from './DatePanelBody';
import MonthPanel from '../month/MonthPanel';
import TimePanel from '../time/TimePanel';

export default class DatePanel extends Component {
  static defaultProps = {
    showPrev: true,
    showNext: true
  }

  constructor(props) {
    super(props);
    this.state = {
      showTime: props.showTime !== undefined,
      showMonth: false
    };
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
          disabledTime={props.showTime.disabledTime}
          onChange={props.showTime.onChange}
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
        {state.showTime ? timePanel : ''}
      </div>
    );
  }
}

