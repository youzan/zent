import React, { PureComponent } from 'react';

import PanelHeader from '../common/PanelHeader';
import YearPanelBody from './YearPanelBody';
import { noop } from '../constants';

export default class YearPanel extends PureComponent {
  prevYears = () => {
    const { actived, onChange } = this.props;
    const prev = actived.getFullYear() - 12;
    onChange(prev, true);
  };

  nextYears = () => {
    const { actived, onChange } = this.props;
    const next = actived.getFullYear() + 12;
    onChange(next, true);
  };

  render() {
    const { actived, onSelect, selected, disabledDate } = this.props;
    const currentYear = parseInt(actived.getFullYear(), 10);
    const title = `${currentYear - 4}~${currentYear + 7}`;

    return (
      <div className="year-panel">
        <PanelHeader
          title={title}
          onClickTitle={noop}
          prev={this.prevYears}
          next={this.nextYears}
        />
        <YearPanelBody
          actived={actived}
          selected={selected}
          disabledDate={disabledDate}
          onSelect={onSelect}
        />
      </div>
    );
  }
}
