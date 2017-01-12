import React, { Component } from 'react';
import PanelHeader from '../common/PanelHeader';
import MonthPanelBody from './MonthPanelBody';
import YearPanel from '../year/YearPanel';
import { goYears } from '../utils/';

export default class MonthPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showYear: false
    };
  }
  prevYear = () => {
    let prev = goYears(this.props.actived, -1);
    this.props.onSelect(prev, true);
  }
  nextYear = () => {
    let next = goYears(this.props.actived, 1);
    this.props.onSelect(next, true);
  }
  showYearPanel = () => {
    this.setState({
      showYear: true
    });
  }
  onSelectYear = (val) => {
    this.setState({
      showYear: false
    });
    let d = new Date(this.props.actived);
    d.setFullYear(val);
    this.props.onSelect(d, true);
  }
  onSelectMonth = (val) => {
    let d = new Date(this.props.actived);
    d.setMonth(val);
    this.props.onSelect(d);
  }
  render() {
    const props = this.props;
    const state = this.state;
    const title = `${props.actived.getFullYear()}年`;
    let yearPanel;
    if (state.showYear) {
      yearPanel = (
        <YearPanel
          actived={props.actived}
          onSelect={this.onSelectYear}
          />
      );
    }
    return (
      <div className="month-panel">
        <PanelHeader
          title={title}
          onClick={this.showYearPanel}
          prev={this.prevYear}
          next={this.nextYear}
          />
        <MonthPanelBody
          actived={props.actived}
          selected={props.selected}
          onSelect={this.onSelectMonth}
          />
        {state.showYear ? yearPanel : ''}
      </div>
    );
  }
}
