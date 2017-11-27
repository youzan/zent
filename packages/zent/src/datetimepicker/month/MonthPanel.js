import React, { Component, PureComponent } from 'react';
import PanelHeader from '../common/PanelHeader';
import MonthPanelBody from './MonthPanelBody';
import YearPanel from '../year/YearPanel';
import { goYears } from '../utils/';

export default class MonthPanel extends (PureComponent || Component) {
  state = {
    showYear: false
  };

  prevYear = () => {
    const { actived, onChange } = this.props;
    const prev = goYears(actived, -1);
    onChange(prev, true);
  };

  nextYear = () => {
    const { actived, onChange } = this.props;
    const next = goYears(actived, 1);
    onChange(next, true);
  };

  showYearPanel = () => {
    this.setState({
      showYear: true
    });
  };

  onSelectYear = (val, close = false) => {
    const { actived, onChange } = this.props;
    const acp = new Date(actived);

    acp.setFullYear(val);
    onChange(acp, true);

    this.setState({
      showYear: close
    });
  };

  onSelectMonth = val => {
    const { actived, onSelect } = this.props;
    const acp = new Date(actived);

    acp.setMonth(val);
    onSelect(acp);
  };

  render() {
    const { props, state } = this;
    const title = `${props.actived.getFullYear()}年`;

    let yearPanel;
    if (state.showYear) {
      yearPanel = (
        <YearPanel
          actived={props.actived}
          selected={props.selected}
          onChange={this.onSelectYear}
          onSelect={this.onSelectYear}
        />
      );
    }

    return (
      <div className="month-panel">
        <PanelHeader
          title={title}
          onClickTitle={this.showYearPanel}
          prev={this.prevYear}
          next={this.nextYear}
        />
        <MonthPanelBody
          actived={props.actived}
          selected={props.selected}
          disabledDate={props.disabledDate}
          onSelect={this.onSelectMonth}
        />
        {state.showYear && yearPanel}
      </div>
    );
  }
}
