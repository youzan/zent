import React, { PureComponent } from 'react';

import PanelHeader from '../common/PanelHeader';
import MonthPanelBody from './MonthPanelBody';
import YearPanel from '../year/YearPanel';
import { goYears, monthStart } from '../utils';

export default class MonthPanel extends PureComponent {
  state = {
    showYear: false,
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
      showYear: true,
    });
  };

  onSelectYear = (val, close = false) => {
    const { actived, onChange } = this.props;
    const acp = new Date(actived);

    acp.setFullYear(val);
    onChange(acp, true);

    this.setState({
      showYear: close,
    });
  };

  onSelectMonth = val => {
    const { actived, onSelect } = this.props;
    const acp = monthStart(actived);

    acp.setMonth(val);
    onSelect(acp);
  };

  render() {
    const {
      props: { actived, disabledDate, i18n, selected },
      state: { showYear },
    } = this;
    const title = `${actived.getFullYear()}`;

    let yearPanel;
    if (showYear) {
      yearPanel = (
        <YearPanel
          actived={actived}
          selected={selected}
          onChange={this.onSelectYear}
          onSelect={this.onSelectYear}
          i18n={i18n}
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
          disabledDate={disabledDate}
          onSelect={this.onSelectMonth}
          i18n={i18n}
          year={actived.getFullYear()}
        />
        {showYear && yearPanel}
      </div>
    );
  }
}
