import React, { Component, PureComponent } from 'react';
import PanelHeader from '../common/PanelHeader';
import SeasonPanelBody from './SeasonPanelBody';
import YearPanel from '../year/YearPanel';
import { goYears } from '../utils/';

export default class SeasonPanel extends (PureComponent || Component) {
  state = {
    showYear: false
  };

  prevYear = () => {
    const { actived, onChange } = this.props;
    const prev = goYears(actived, -1);
    onChange(prev);
  };

  nextYear = () => {
    const { actived, onChange } = this.props;
    const next = goYears(actived, 1);
    onChange(next);
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
    onChange(acp);

    this.setState({
      showYear: close
    });
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
      <div className="season-panel">
        <PanelHeader
          title={title}
          onClickTitle={this.showYearPanel}
          prev={this.prevYear}
          next={this.nextYear}
        />
        <SeasonPanelBody
          actived={props.actived}
          selected={props.selected}
          disabledDate={props.disabledDate}
          onSelect={props.onSelect}
        />
        {state.showYear && yearPanel}
      </div>
    );
  }
}
