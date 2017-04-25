import React, { Component } from 'react';
import PanelHeader from '../common/PanelHeader';
import YearPanelBody from './YearPanelBody';
import { noop } from '../constants';

export default class YearPanel extends Component {
  prevYears = () => {
    const { actived, onSelect } = this.props;
    const prev = actived.getFullYear() - 12;
    onSelect(prev, true);
  }

  nextYears = () => {
    const { actived, onSelect } = this.props;
    const next = actived.getFullYear() + 12;
    onSelect(next, true);
  }

  render() {
    const props = this.props;
    const { actived, onSelect, selected } = this.props;
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
          max={props.max}
          min={props.min}
          onSelect={onSelect}
        />
      </div>
    );
  }
}
