import React, { PureComponent } from 'react';
import PanelHeader from '../common/PanelHeader';
import QuarterPanelBody from './QuarterPanelBody';
import YearPanel from '../year/YearPanel';
import { goYears } from '../utils/';

export default class QuarterPanel extends PureComponent {
  state = {
    showYear: false,
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
      showYear: true,
    });
  };

  onSelectYear = (val, close = false) => {
    const { actived, onChange } = this.props;
    const acp = new Date(actived);

    acp.setFullYear(val);
    onChange(acp);

    this.setState({
      showYear: close,
    });
  };

  render() {
    const {
      props: { actived, disabledDate, i18n, onSelect, selected },
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
        />
      );
    }

    return (
      <div className="quarter-panel">
        <PanelHeader
          title={title}
          onClickTitle={this.showYearPanel}
          prev={this.prevYear}
          next={this.nextYear}
        />
        <QuarterPanelBody
          actived={actived}
          selected={selected}
          disabledDate={disabledDate}
          onSelect={onSelect}
          i18n={i18n}
        />
        {showYear && yearPanel}
      </div>
    );
  }
}
