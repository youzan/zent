import React, { Component } from 'react';
import PanelHeader from '../common/PanelHeader';
import MonthPanelBody from './MonthPanelBody';
import YearPanel from '../year/YearPanel';
import { goYears } from '../utils/';

export default class MonthPanel extends Component {
  state = {
    showYear: false
  }

  prevYear = () => {
    const { actived, onSelect } = this.props;
    const prev = goYears(actived, -1);
    onSelect(prev, true);
  }

  nextYear = () => {
    const { actived, onSelect } = this.props;
    const next = goYears(actived, 1);
    onSelect(next, true);
  }

  showYearPanel = () => {
    this.setState({
      showYear: true
    });
  }

  onSelectYear = (val, close = false) => {
    const { actived, onSelect } = this.props;
    const copy = new Date(actived);

    copy.setFullYear(val);
    onSelect(copy, true);

    this.setState({
      showYear: close
    });
  }

  onSelectMonth = (val) => {
    const { actived, onSelect } = this.props;
    const copy = new Date(actived);

    copy.setMonth(val);
    onSelect(copy);
  }

  render() {
    const { actived, selected } = this.props;
    const { showYear } = this.state;
    const title = `${actived.getFullYear()}年`;

    let yearPanel;
    if (showYear) {
      yearPanel = (
        <YearPanel
          actived={actived}
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
          actived={actived}
          selected={selected}
          onSelect={this.onSelectMonth}
        />
        {showYear ? yearPanel : ''}
      </div>
    );
  }
}
